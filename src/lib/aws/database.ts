import { RDSDataClient, ExecuteStatementCommand, BatchExecuteStatementCommand } from "@aws-sdk/client-rds-data";

const client = new RDSDataClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const DATABASE_ARN = process.env.DATABASE_ARN!;
const SECRET_ARN = process.env.DATABASE_SECRET_ARN!;
const DATABASE_NAME = "relay_invoice";

type SqlValue = string | number | boolean | null;

interface SqlParameter {
  name: string;
  value: {
    stringValue?: string;
    longValue?: number;
    booleanValue?: boolean;
    isNull?: boolean;
  };
}

function toParameter(name: string, value: SqlValue): SqlParameter {
  if (value === null || value === undefined) {
    return { name, value: { isNull: true } };
  }
  if (typeof value === "string") {
    return { name, value: { stringValue: value } };
  }
  if (typeof value === "number") {
    return { name, value: { longValue: value } };
  }
  if (typeof value === "boolean") {
    return { name, value: { booleanValue: value } };
  }
  return { name, value: { stringValue: String(value) } };
}

export async function query<T = any>(
  sql: string,
  params: Record<string, SqlValue> = {}
): Promise<T[]> {
  const parameters = Object.entries(params).map(([name, value]) =>
    toParameter(name, value)
  );

  const command = new ExecuteStatementCommand({
    resourceArn: DATABASE_ARN,
    secretArn: SECRET_ARN,
    database: DATABASE_NAME,
    sql,
    parameters,
    includeResultMetadata: true,
  });

  const response = await client.send(command);
  
  if (!response.records || !response.columnMetadata) {
    return [];
  }

  const columns = response.columnMetadata.map((col) => col.name!);
  
  return response.records.map((record) => {
    const row: any = {};
    record.forEach((field, index) => {
      const columnName = columns[index];
      if (field.isNull) {
        row[columnName] = null;
      } else if (field.stringValue !== undefined) {
        row[columnName] = field.stringValue;
      } else if (field.longValue !== undefined) {
        row[columnName] = field.longValue;
      } else if (field.booleanValue !== undefined) {
        row[columnName] = field.booleanValue;
      } else if (field.doubleValue !== undefined) {
        row[columnName] = field.doubleValue;
      }
    });
    return row as T;
  });
}

export async function execute(
  sql: string,
  params: Record<string, SqlValue> = {}
): Promise<number> {
  const parameters = Object.entries(params).map(([name, value]) =>
    toParameter(name, value)
  );

  const command = new ExecuteStatementCommand({
    resourceArn: DATABASE_ARN,
    secretArn: SECRET_ARN,
    database: DATABASE_NAME,
    sql,
    parameters,
  });

  const response = await client.send(command);
  return response.numberOfRecordsUpdated || 0;
}

export async function queryOne<T = any>(
  sql: string,
  params: Record<string, SqlValue> = {}
): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results[0] || null;
}

export async function insert(
  table: string,
  data: Record<string, SqlValue>
): Promise<void> {
  const columns = Object.keys(data);
  const values = columns.map((col) => `:${col}`);
  
  const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")})`;
  await execute(sql, data);
}

export async function update(
  table: string,
  data: Record<string, SqlValue>,
  where: Record<string, SqlValue>
): Promise<number> {
  const setClauses = Object.keys(data).map((col) => `${col} = :${col}`);
  const whereClauses = Object.keys(where).map((col) => `${col} = :where_${col}`);
  
  const params: Record<string, SqlValue> = { ...data };
  Object.entries(where).forEach(([key, value]) => {
    params[`where_${key}`] = value;
  });
  
  const sql = `UPDATE ${table} SET ${setClauses.join(", ")} WHERE ${whereClauses.join(" AND ")}`;
  return execute(sql, params);
}
