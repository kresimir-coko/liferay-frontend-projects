/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

const stylelint = require('stylelint');

const ruleName = 'liferay/no-import-extension';

const messages = stylelint.utils.ruleMessages(ruleName, {
	extension: 'imports must omit the ".scss" extension',
});

const PARAMS_REGEXP = /^(['"]?)(.+?)(['"]?)$/;

const SCSS_EXT = '.scss';

module.exports = stylelint.createPlugin(
	ruleName,
	(options, secondaryOptions, context) => {
		return function (root, result) {
			const validOptions = stylelint.utils.validateOptions(
				result,
				ruleName,
				{
					actual: options,
					possible: [true, false],
				},
				{
					actual: secondaryOptions,
					optional: true,
					possible: {
						disableFix: [true, false],
					},
				}
			);

			if (!validOptions || !options) {
				return;
			}

			const disableFix = secondaryOptions && secondaryOptions.disableFix;

			const fix = context ? context.fix && !disableFix : false;

			root.walkAtRules('import', (rule) => {
				if (rule.params.startsWith('url(')) {
					return;
				}

				const [, left, params, right] = rule.params.match(
					PARAMS_REGEXP
				);

				if (params.endsWith(SCSS_EXT)) {
					const desired =
						left + params.slice(0, -SCSS_EXT.length) + right;

					if (fix) {
						rule.replaceWith(rule.clone({params: desired}));
					}
					else {
						stylelint.utils.report({
							message: messages.extension,
							node: rule,
							result,
							ruleName,
						});
					}
				}
			});
		};
	}
);

module.exports.ruleName = ruleName;
module.exports.messages = messages;
