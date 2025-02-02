/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { DI } from '@/di-symbols.js';
import type { CheckinableRepository } from '@/models/_.js';
import { awaitAll } from '@/misc/prelude/await-all.js';
import type { Packed } from '@/misc/json-schema.js';
import type { } from '@/models/Blocking.js';
import type { MiUser } from '@/models/User.js';
import type { Checkinable } from '@/models/_.js';
import { bindThis } from '@/decorators.js';

@Injectable()
export class CheckinableEntityService {
	constructor(
		@Inject(DI.checkinableRepository)
		private checkinableRepository: CheckinableRepository,
	) {
	}

	@bindThis
	public async pack(
		src: Checkinable['id'] | Checkinable,
		me?: { id: MiUser['id'] } | null | undefined,
	): Promise<Packed<'Checkinable'>> {
		const checkinable = typeof src === 'object' ? src : await this.checkinableRepository.findOneByOrFail({ id: src });

		return await awaitAll({
			id: checkinable.id,
      label: checkinable.label,
      classification: checkinable.classification,
      source: checkinable.source,
      icon: checkinable.icon,
		});
	}

	@bindThis
	public packMany(
		mutings: any[],
		me: { id: MiUser['id'] },
	) {
		return Promise.all(mutings.map(x => this.pack(x, me)));
	}
}

