/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const packedCheckinableSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			optional: false, nullable: false,
			format: 'id',
			example: 'xxxxxxxxxx',
		},
		label: {
			type: 'string',
			optional: false, nullable: false,
		},
		classification: {
			type: 'string',
			optional: false, nullable: false,
		},
		source: {
			type: 'string',
			optional: false, nullable: false,
		},
		icon: {
			type: 'string',
			optional: false, nullable: false,
		},
	},
} as const;
