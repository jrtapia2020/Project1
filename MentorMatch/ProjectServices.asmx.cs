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
		public string ConnectToServer(string username, string password)
		{
			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"select * from users where username='{username}' and password='{password}'";

				////////////////////////////////////////////////////////////////////////
				///here's an example of using the getConString method!
				////////////////////////////////////////////////////////////////////////
				//MySqlConnection con = new MySqlConnection(getConString());
				////////////////////////////////////////////////////////////////////////
				con.Open();

				MySqlCommand cmd = new MySqlCommand(Query, con);
				MySqlDataReader rdr = cmd.ExecuteReader();

				if (rdr.Read())
				{
					///// Ignore for now. /////
					Console.WriteLine(rdr[1] + " -- " + rdr[2]);
					/////// TODO: Changed later to take to take to homepage //////
					return "Correct credentials.";
				}

				//// Ignore below until I can ask Nichols what this does. --Jesus Tapia-Martinez ////
				/*MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
				DataTable table = new DataTable();
				adapter.Fill(table);*/
				else
				{
					return "Incorrect Username or password.";
				}
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
		public string CreateNewAccount(string username, string password, string firstname, string lastname,
										string major1, string major2, string minor1, string minor2, string grade)
		{

			MySqlConnection con = new MySqlConnection(getConString());
			try
			{
				string Query = $"INSERT INTO users (username, password, firstname, lastname, major1, major2, minor1, minor2, grade) " +
							   $"VALUES ('{username}', '{password}', '{firstname}', '{lastname}', '{major1}', '{major2}', '{minor1}', '{minor2}', '{grade}');";

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
