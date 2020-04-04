using System;
using System.Data;
using System.Web.Services;
using MySql.Data.MySqlClient;

namespace MentorMatch
{
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	[System.Web.Script.Services.ScriptService]

	public class ProjectServices : System.Web.Services.WebService
	{
		////////////////////////////////////////////////////////////////////////
		///replace the values of these variables with your database credentials
		////////////////////////////////////////////////////////////////////////
		private string dbID = "sundev11s";
		private string dbPass = "!!Sundev11s";
		private string dbName = "sundev11s";
		////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////
		///call this method anywhere that you need the connection string!
		////////////////////////////////////////////////////////////////////////
		private string getConString() {
			return "SERVER=107.180.1.16; PORT=3306; DATABASE=" + dbName+"; UID=" + dbID + "; PASSWORD=" + dbPass;
		}
		////////////////////////////////////////////////////////////////////////



		/////////////////////////////////////////////////////////////////////////
		//don't forget to include this decoration above each method that you want
		//to be exposed as a web service!
		[WebMethod(EnableSession = true)]
		/////////////////////////////////////////////////////////////////////////
		public string[] ConnectToServer(string employeeUsername, string employeePassword)
		{
			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"select * from employees where employeeUsername='{employeeUsername}' and employeePassword='{employeePassword}'";

				con.Open();

				MySqlCommand cmd = new MySqlCommand(Query, con);
				MySqlDataReader rdr = cmd.ExecuteReader();

				if (rdr.Read())  
				{
					///// Ignore for now. /////
					Console.WriteLine(rdr[1] + " -- " + rdr[2]);

					string username = rdr[1].ToString();
					string fName = rdr[3].ToString();
					string lName = rdr[4].ToString();
					string jobTitle = rdr[5].ToString();
					string email = rdr[6].ToString();
					string bio = rdr[7].ToString();
					string personality = rdr[8].ToString();


					string[] employeeInfo = {username, fName, lName, jobTitle, email, bio, personality};

					return employeeInfo;
				}

				//// Ignore below until I can ask Nichols what this does. --Jesus Tapia-Martinez ////
				/*MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
				DataTable table = new DataTable();
				adapter.Fill(table);*/
				else
				{
					string[] incorrect = {"incorrect"};
					return incorrect;
				}
			}
			catch (Exception e)
			{
				string[] error = {"Error: " + e.Message};
				return error;
			}
			finally
			{
				con.Close();
			}
		}

		/////////////////////////////////////////////////////////////////////////
		[WebMethod(EnableSession = true)]
		/////////////////////////////////////////////////////////////////////////
		public string CreateNewAccount(string employeeUsername, string employeePassword, string employeeFirstName, string employeeLastName,
										string employeeJobTitle, string employeeEmail, string employeeBio)
		{

			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"INSERT INTO employees (employeeUsername, employeePassword, employeeFirstName, employeeLastName, employeeJobTitle, employeeEmail, employeeBio) " +
							   $"VALUES ('{employeeUsername}', '{employeePassword}', '{employeeFirstName}', '{employeeLastName}', '{employeeJobTitle}', '{employeeEmail}', '{employeeBio}');";

				MySqlCommand cmd = new MySqlCommand(Query, con);

				con.Open();
				int result = cmd.ExecuteNonQuery();

				return "New Account was created!";
			}
			catch (Exception e)
			{
				return "Error: " + e.Message;
			}
			finally
			{
				con.Close();
			}
		}
		}
}
