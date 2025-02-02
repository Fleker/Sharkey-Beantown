/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import type { CheckinableRepository } from '@/models/_.js';
import { QueryService } from '@/core/QueryService.js';
import { CheckinableEntityService } from '@/core/entities/CheckinableEntityService.js';
import { DI } from '@/di-symbols.js';

export const meta = {
	tags: ['checkinable'],

	requireCredential: true,

	kind: 'read:checkinable',

	res: {
		type: 'array',
		optional: false, nullable: false,
		items: {
			type: 'object',
			optional: false, nullable: false,
			ref: 'Checkinable',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		limit: { type: 'integer', minimum: 1, maximum: 100, default: 30 },
    prefix: { type: 'string' },
	},
	required: [],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.checkinableRepository)
		private checkinableRepository: CheckinableRepository,

		private checkinEntityService: CheckinableEntityService,
		private queryService: QueryService,
	) {
		super(meta, paramDef, async (ps, me) => {
			console.log('request for que2ry')
			const query = this.queryService.makePaginationQuery(this.checkinableRepository.createQueryBuilder('checkinable'))
				// .andWhere('muting.muterId = :meId', { meId: me.id });

			const checkinables = await query
				.limit(ps.limit)
				.getMany();

			return await this.checkinEntityService.packMany(checkinables, me);
		});
	}
}
