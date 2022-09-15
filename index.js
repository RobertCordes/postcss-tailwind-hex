/**
 * Module RGB(a)-HEX
 * @type {"postcss"}
 */

//
// Module dependencies

var rgb2hex = require('rgb2hex');
var assign = require('object-assign'); // fixme: remove after postcss node 0.12 drop support

/**
 * PostCSS plugin
 * @type {*}
 */
module.exports = (opts = {}) => {
    var reg = /rgb\(\d+%?\s*\d+%?\s*\d+%?\s*(,\s*\d?.?\d+|\/\s*var\(--tw-(?:.*)-opacity\))?\)/g;
    var o = assign({}, opts);

    return {
        postcssPlugin: 'postcss-tailwind-hex',
        Once(root, { result }) {
            console.log('Converting Tailwind colors to hex');
        },
        Declaration(decl) {
            var val = decl.value;

            // early return
            if (!val) {
                return;
            }

            // stripping values
            var rgbValues = val.match(reg);

            // converting values
            if (rgbValues && rgbValues.length > 0) {
                var newVal = val;

                rgbValues.forEach(rgb => {
                    var rgbString = rgb.replace(/\s*\/\s*var\(--tw-(.*)-opacity\)/, '');
                    // convert rgba(0 0 0) to rgb(0,0,0)
                    rgbString = rgbString.replace(/\s/g, ',');
                    newVal = newVal.replace(rgb, rgbaToHex(rgbString));

                    if (!o.silent) {
                        console.info('RGB(a) replaced: ' + rgb + ' -> ' + rgbaToHex(rgbString));
                    }
                });
                decl.value = newVal;
            }
        }
    }
}
module.exports.postcss = true

/**
 * RGBA(a) to hex transformer
 * @param rgbaString
 * @returns {string}
 */
function rgbaToHex(rgbaString) {
    var hexString = '';

    hexString = rgb2hex(rgbaString).hex;

    return hexString;
}

/**
 * function doing nothing
 * @returns {boolean}
 */
function noop() {
    return false;
}
