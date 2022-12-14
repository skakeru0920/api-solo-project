require("dotenv").config({
	path: "./.env.local",
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: "postgresql",
	connection: process.env.DB_URL || {
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || 5432,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},
	migrations: {
		directory: "./db/migrations",
	},
	seeds: {
		directory: "./db/seeds",
	},

	// development: {
	//   client: 'pg',
	//   connection: {
	//     filename: './dev.sqlite3'
	//   }
	// },

	// staging: {
	//   client: 'postgresql',
	//   connection: {
	//     database: 'my_db',
	//     user:     'username',
	//     password: 'password'
	//   },
	//   pool: {
	//     min: 2,
	//     max: 10
	//   },
	//   migrations: {
	//     tableName: 'knex_migrations'
	//   }
	// },

	// production: {
	//   client: 'postgresql',
	//   connection: {
	//     database: 'my_db',
	//     user:     'username',
	//     password: 'password'
	//   },
	//   pool: {
	//     min: 2,
	//     max: 10
	//   },
	//   migrations: {
	//     tableName: 'knex_migrations'
	//   }
	// }
};
