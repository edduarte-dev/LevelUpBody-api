import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUsuarioGoogle1700000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    // 1️⃣ adiciona colunas provider e googleId
    await queryRunner.addColumns("tb_usuarios", [
      new TableColumn({
        name: "provider",
        type: "varchar",
        length: "20",
        isNullable: false,
        default: "'LOCAL'", // MySQL exige aspas simples
      }),
      new TableColumn({
        name: "google_id",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
    ]);

    // 2️⃣ torna a senha opcional (para login Google)
    await queryRunner.changeColumn(
      "tb_usuarios",
      "senha",
      new TableColumn({
        name: "senha",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    // 1️⃣ restaura senha obrigatória
    await queryRunner.changeColumn(
      "tb_usuarios",
      "senha",
      new TableColumn({
        name: "senha",
        type: "varchar",
        length: "255",
        isNullable: false,
      }),
    );

    // 2️⃣ remove colunas adicionadas
    await queryRunner.dropColumn("tb_usuarios", "google_id");
    await queryRunner.dropColumn("tb_usuarios", "provider");
  }
}
