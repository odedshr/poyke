import { verbose as SQLite3, Database } from 'sqlite3';
import { readdirSync, readFileSync } from 'fs';

export class DataProvider {
	connectionStr: string;

	constructor(connectionStr: string) {
		this.connectionStr = connectionStr;
	}

	private getDB(): Database {
		const sqlite3 = SQLite3();
		return new sqlite3.Database(this.connectionStr);
	}

	async init(migrationFolder: string = ':memory:') {
		const db = this.getDB();
		await this.updateDB(db, migrationFolder);
		db.close();
	}

	private async updateDB(db: Database, migrationFolder: string) {
		const versionRecord = await get(db, 'PRAGMA user_version');
		const version: string = '' + versionRecord.user_version;
		const migrationsFiles: string[] = readdirSync(migrationFolder)
			.filter(filename => version < filename.match(/-((\d+\.?)*)\.sql/)[1])
			.sort();

		if (migrationsFiles.length) {
			const newVersion = migrationsFiles[migrationsFiles.length - 1].match(/-(\d+)\.sql/)[1];
			db.serialize(async () => {
				migrationsFiles.forEach(
					async filename => await exec(db, readFileSync(`${migrationFolder}/${filename}`, 'utf-8'))
				);
				await exec(db, `PRAGMA user_version=${newVersion}`);
			});

			console.info(`db migrated from v${version}  to v${newVersion}`);
		} else {
			console.info(`db is up to date (v${version})`);
		}

		return {};
	}

	public async test() {
		const db = this.getDB();
		await test(db);
		db.close();
	}
}

async function exec(db: Database, query: string): Promise<void> {
	return new Promise((resolve, reject) =>
		db.exec(query, (err: Error) => {
			if (err) {
				reject(err);
			}
			resolve();
		})
	);
}

async function get(db: Database, query: string): Promise<any> {
	return new Promise((resolve, reject) => {
		db.get(query, (err: Error, row: any) => {
			if (err) {
				reject(err);
			}
			resolve(row);
		});
	});
}

export async function test(db: Database): Promise<void> {
	return new Promise(resolve => {
		db.serialize(async () => {
			// db.run('CREATE TABLE lorem (info TEXT)');
			console.log(await get(db, 'PRAGMA user_version'));
			var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
			for (var i = 0; i < 10; i++) {
				stmt.run('Ipsum ' + i);
			}
			stmt.finalize();

			db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
				console.log(row.id + ': ' + row.info);
			});
			resolve();
		});
	});
}
