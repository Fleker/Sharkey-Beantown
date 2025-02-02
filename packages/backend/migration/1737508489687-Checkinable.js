import { Table } from 'typeorm';

export class Checkinable1737508489687 {
  async up(queryRunner) {
    await queryRunner.createTable(
        new Table({
        name: 'checkinable',
        columns: [
            {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            },
            {
            name: 'label',
            type: 'varchar',
            length: '4095',
            },
            {
            name: 'classification',
            type: 'varchar',
            length: '255',
            },
            {
            name: 'source',
            type: 'varchar',
            length: '4095',
            },
            {
            name: 'icon',
            type: 'varchar',
            length: '4095',
            },
        ],
        }),
      )
    }

  async down(queryRunner) {
    await queryRunner.dropTable('checkinable')
  }
}