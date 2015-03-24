/**
 * Angular Colors Util
 * v0.0.1
 *
 * @alias com.devnup.color
 *
 * @author luis@devnup.com
 * @since 03/02/15.
 */
angular.module('com.devnup.color', [])

  .factory('$color', [

    /**
     * Angular Colors Service
     * v0.0.1
     *
     * @class
     * @type {Function}
     * @alias com.devnup.color.$color
     */
      function () {

      // Default Values
      var cache = {
        value: 80,
        saturation: 70,
        number: 10
      };

      /**
       * HSV to RGB color conversion
       *
       * H runs from 0 to 360 degrees
       * S and V run from 0 to 100
       *
       * @alias com.devnup.color.$color~hsvToRgb
       *
       * @param {Number} hue The hue value
       * @param {Number} saturation The saturation value
       * @param {Number} value The color valur
       */
      var hsvToRgb = function (hue, saturation, value) {

        var r, g, b, i, f, p, q, t;

        // Make sure our arguments stay in-range
        hue = Math.max(0, Math.min(360, hue));
        saturation = Math.max(0, Math.min(100, saturation));
        value = Math.max(0, Math.min(100, value));

        // We accept saturation and value arguments from 0 to 100 because that'saturation
        // how Photoshop represents those values. Internally, however, the
        // saturation and value are calculated from a range of 0 to 1. We make
        // That conversion here.
        saturation /= 100;
        value /= 100;

        if (saturation == 0) {

          // Achromatic (grey)
          r = g = b = value;
          return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        hue /= 60; // sector 0 to 5
        i = Math.floor(hue);
        f = hue - i; // factorial part of hue
        p = value * (1 - saturation);
        q = value * (1 - saturation * f);
        t = value * (1 - saturation * (1 - f));

        switch (i) {

          case 0:

            r = value;
            g = t;
            b = p;
            break;

          case 1:

            r = q;
            g = value;
            b = p;
            break;

          case 2:

            r = p;
            g = value;
            b = t;
            break;

          case 3:

            r = p;
            g = q;
            b = value;
            break;

          case 4:

            r = t;
            g = p;
            b = value;
            break;

          default: // case 5:
            r = value;
            g = p;
            b = q;
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

      };

      /**
       * RGB to HEX conversion
       *
       * @alias com.devnup.color.$color~rgbToHex
       *
       * @param red
       * @param green
       * @param blue
       * @returns {string}
       */
      var rgbToHex = function (red, green, blue) {
        var decColor = red + 256 * green + 256 * 256 * blue;
        return decColor.toString(16);
      };

      /**
       * Shade a hex color
       *
       * @alias com.devnup.color.$color~shadeColor
       *
       * @param {Number} color The color hex as a number
       * @param {Number} percent The percentage of the shading
       * @returns {string} The shade hex color generated
       */
      var shadeColor = function (color, percent) {
        var num = parseInt(color, 16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = (num >> 8 & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;
        return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
      };

      /**
       * Generate distinct colors based on HSV
       *
       * @alias com.devnup.color.$color~distinctColors
       *
       * @param {Number} count The color count
       * @returns {Array} The colors array
       */
      var distinctColors = function (count) {
        var i = 360 / (count); // distribute the colors evenly on the hue range
        var r = []; // hold the generated colors
        for (var x = 0; x < count; x++) {
          r.push(hsvToRgb(i * x, cache.saturation, cache.value)); // changes on saturation and value changes the final result
        }
        return r;
      };

      /**
       * Generate distinct colors
       *
       * @alias com.devnup.color.$color~distinctHexColors
       *
       * @param {Number} count The color count
       * @returns {Array} The colors array
       */
      var distinctHexColors = function (count) {
        var colorsHex = [], colorsDec = distinctColors(count);
        for (k in colorsDec) {
          colorsHex[k] = "#" + rgbToHex(colorsDec[k][0], colorsDec[k][1], colorsDec[k][2]);
        }
        return colorsHex;
      };

      return {

        /**
         * Set generator configuration values.
         *
         * @alias com.devnup.color.$color#config
         *
         * @param {Object} input The input configuration
         * @param {Number} [input.value] The color value
         * @param {Number} [input.saturation] The color saturation
         * @param {Number} [input.number] The color number
         */
        config: function (input) {
          cache.value = input.value || cache.value;
          cache.saturation = input.saturation || cache.saturation;
          cache.number = input.number || cache.number;
        },

        /**
         * Generate a new random color set.
         *
         * @alias com.devnup.color.$color#generate
         *
         * @param {Number} number The color count
         * @param {Boolean} [branding] If true generate using branding colors as reference
         */
        generate: function (number, branding) {

          // Generate colors based on branding
          if (number && number > 0 && branding) {
            return distinctHexColors(number);
          }

          // Generate distinct colors
          else {
            return distinctColors(number);
          }

        },

        /**
         * Hover a hex color.
         *
         * @alias com.devnup.color.$color#hover
         *
         * @param {Number} color The color to hover.
         * @param {Number} [percent] The value to hover, default: 20%
         */
        hover: function (color, percent) {
          percent = percent || 20;
          return shadeColor(color, percent);
        }

      }

    }]);