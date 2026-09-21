---
title: "Maria DB 연결 (using ODBC)"
date: 2017-02-06
updated: 2018-11-08
summary: "Maria DB 연결 (using ODBC)"
tags: ["C#", "WPF"]
key: tistory-4
---

```
/* ddd */
using System.Data.Odbc;

OdbcConnection conn;
OdbcCommand cmd;
OdbcDataReader reader;

private void button1_Click(object sender, EventArgs e)
{
     conn = null;
     cmd = null;
            
     try
     {
           string connSrt = @"Driver={MariaDB ODBC 2.0 Driver};Server=localhost;UID=root;PWD=1234;DB=flight_data;Port=3306";
           using (conn = new OdbcConnection(connSrt))
           {
               conn.Open();
               if (conn.State == ConnectionState.Open)
               {
                   Console.WriteLine("Successed");

                   string cmdStr = "SHOW tables";

                    cmd = new OdbcCommand("CREATE DATABASE imbae;", conn);

                    reader = cmd.ExecuteReader();
                        
                    OdbcDataAdapter adapter = new OdbcDataAdapter(cmdStr, conn);
                    DataTable table = new DataTable();
                    adapter.Fill(table);

                    dataGridView.DataSource = table;
               }
           }
       }
       catch (Exception ex)
       {
           Console.WriteLine("Error: " + ex.Message);
       }
}
```
