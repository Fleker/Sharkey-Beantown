/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { Checkinable } from '@/models/_.js';
import type { CheckinableRepository } from '@/models/_.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { DI } from '@/di-symbols.js';
import { ApiError } from '../../error.js';
import { IdService } from '@/core/IdService.js';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'systeminformation';

export const meta = {
	tags: ['checkinable'],

	requireCredential: true,
	requireAdmin: true,
	prohibitMoved: true,

	kind: 'write:checkinable',

	errors: {
		unauthorized: {
      message: 'Unauthorized',
      code: 'UNAUTHORIZED',
      id: 'b8b',
    }
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		label: { type: 'string' },
		classification: { type: 'string' },
    source: { type: 'string' },
		icon: { type: 'string' },
	},
	required: ['label', 'classification', 'source', 'icon'],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.checkinableRepository)
		private checkinableRepository: CheckinableRepository,
	) {
		super(meta, paramDef, async (ps, me) => {
			console.log(me)
      // if (!me.isRoot) {
      //   throw new ApiError(meta.errors.unauthorized)
      // }

      const checkinable = await this.checkinableRepository.insert(new Checkinable({
				id: uuidv4(),
				label: ps.label,
        classification: ps.classification,
        source: ps.source,
        icon: ps.icon,
      }))

      return checkinable
		});
	}
}
