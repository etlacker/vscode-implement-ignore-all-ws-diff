/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event } from 'vs/base/common/event';
import { LineRangeMapping } from 'vs/editor/common/diff/linesDiffComputer';
import { ITextModel } from 'vs/editor/common/model';

/**
 * A document diff provider computes the diff between two text models.
 */
export interface IDocumentDiffProvider {
	/**
	 * Computes the diff between the text models `original` and `modified`.
	 */
	computeDiff(original: ITextModel, modified: ITextModel, options: IDocumentDiffProviderOptions): Promise<IDocumentDiff>;

	/**
	 * Is fired when settings of the diff algorithm change that could alter the result of the diffing computation.
	 * Any user of this provider should recompute the diff when this event is fired.
	 */
	onDidChange: Event<void>;
}

/**
 * Options for the diff computation.
 */
export interface IDocumentDiffProviderOptions {
	/**
	 * When set to true, the diff should ignore whitespace changes.i
	 */
	ignoreTrimWhitespace: boolean;

	/**
	 * When set to true, the diff should ignore ALL whitespace changes,
	 * including newlines.
	 */
	ignoreAllWhitespace: boolean;

	/**
	 * A diff computation should throw if it takes longer than this value.
	 */
	maxComputationTimeMs: number;
}

/**
 * Represents a diff between two text models.
 */
export interface IDocumentDiff {
	/**
	 * If true, both text models are identical (byte-wise).
	 */
	readonly identical: boolean;

	/**
	 * If true, the diff computation timed out and the diff might not be accurate.
	 */
	readonly quitEarly: boolean;

	/**
	 * Maps all modified line ranges in the original to the corresponding line ranges in the modified text model.
	 */
	readonly changes: LineRangeMapping[];
}
