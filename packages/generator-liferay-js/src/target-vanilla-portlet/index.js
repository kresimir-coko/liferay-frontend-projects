/**
 * © 2017 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import Generator from 'yeoman-generator';

import * as standardTarget from '../utils/target/standard';

/**
 * Generator for vanilla JS portlets.
 */
export default class extends Generator {
	/**
	 * Standard Yeoman initialization function
	 */
	initializing() {
		standardTarget.initializing(this);

		this.composeWith(require.resolve('./vanilla-portlet'));
	}

	/**
	 * Standard Yeoman install function
	 */
	install() {
		standardTarget.install(this);
	}
}

module.exports = exports['default'];
