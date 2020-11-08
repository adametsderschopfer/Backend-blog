import mysql from "mysql2";
import { dbConfig } from "../config";

const pool = mysql.createPool(dbConfig);

export default pool;
