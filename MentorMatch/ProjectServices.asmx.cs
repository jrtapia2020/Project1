using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Http;
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
					string mentorID = rdr[9].ToString();
					string skill = rdr[10].ToString();


					string[] employeeInfo = {username, fName, lName, jobTitle, email, bio, personality, skill, mentorID};

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
		public string[] MentorInfo(string mentorId)
		{
			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"select * from employees where employeeId='{mentorId}';";

				con.Open();

				MySqlCommand cmd = new MySqlCommand(Query, con);
				MySqlDataReader rdr = cmd.ExecuteReader();

				if (rdr.Read())
				{

					string username = rdr[1].ToString();
					string fName = rdr[3].ToString();
					string lName = rdr[4].ToString();
					string jobTitle = rdr[5].ToString();
					string email = rdr[6].ToString();
					string bio = rdr[7].ToString();
					string personality = rdr[8].ToString();
					string skill = rdr[10].ToString();


					string[] mentorInfo = { username, fName, lName, jobTitle, email, bio, personality, skill };

					return mentorInfo;
				}

				else
				{
					string[] incorrect = { "incorrect" };
					return incorrect;
				}
			}
			catch (Exception e)
			{
				string[] error = { "Error: " + e.Message };
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
		public List<string[]> LoadEmployees()
		{
			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"SELECT employeeFirstName, employeeLastName, employeeJobTitle, skill, employeeUsername, employeeEmail FROM employees WHERE employeeUsername!='admin';";

				con.Open();

				MySqlCommand cmd = new MySqlCommand(Query, con);
				MySqlDataReader rdr = cmd.ExecuteReader();

				
				List<string[]> employees = new List<string[]>();
				while (rdr.Read())
				{

					string fName = rdr[0].ToString();
					string lName = rdr[1].ToString();
					string jobTitle = rdr[2].ToString();
					string skill = rdr[3].ToString();
					string username = rdr[4].ToString();
					string email = rdr[5].ToString();


					string[] employeeInfo = {fName, lName, jobTitle, skill, username, email };

					employees.Add(employeeInfo);
				}
				return employees;
				

				
			}
			catch (Exception e)
			{
				List<string[]> error = new List<string[]>();
				error.Add(new string[] { "error" });
				error.Add(new string[] { "Error: " + e.Message });
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
										string employeeJobTitle, string employeeEmail, string employeeBio, string employeePersonalityType)
		{

			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"INSERT INTO employees (employeeUsername, employeePassword, employeeFirstName, employeeLastName, employeeJobTitle, employeeEmail, employeeBio, employeePersonalityType) " +
							   $"VALUES ('{employeeUsername}', '{employeePassword}', '{employeeFirstName}', '{employeeLastName}', '{employeeJobTitle}', '{employeeEmail}', '{employeeBio}', '{employeePersonalityType}');";

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

		/////////////////////////////////////////////////////////////////////////
		[WebMethod(EnableSession = true)]
		/////////////////////////////////////////////////////////////////////////
		public string EditAccountInfo(string employeeUsername, string employeePassword, string employeeFirstName, string employeeLastName,
										string employeeJobTitle, string employeeEmail, string employeeBio, string employeePersonalityType, string skill)
		{

			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"UPDATE employees " +
							   $"SET employeePassword='{employeePassword}', employeeFirstName='{employeeFirstName}', employeeLastName='{employeeLastName}', employeeJobTitle='{employeeJobTitle}', employeeEmail='{employeeEmail}', employeeBio='{employeeBio}', employeePersonalityType='{employeePersonalityType}', skill='{skill}' " +
							   $"WHERE employeeUsername='{employeeUsername}';";

				MySqlCommand cmd = new MySqlCommand(Query, con);

				con.Open();
				int result = cmd.ExecuteNonQuery();

				return "Profile Info Updated!";
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
