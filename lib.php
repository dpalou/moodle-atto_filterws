<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor integration version file.
 *
 * @package    atto_filterws
 * @copyright  2019 Dani Palou <dani@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Initialise the strings required for js
 */
function atto_filterws_strings_for_js() {
    global $PAGE;

    $strings = array(
        'addfilterws',
        'apply',
        'filteruseragent',
        'insert',
        'insertfilterws',
        'origin',
        'originany',
        'originweb',
        'originws',
        'predefined'
    );

    $PAGE->requires->strings_for_js($strings, 'atto_filterws');
}

/**
 * Sends the parameters to the JS module.
 *
 * @return array
 */
function atto_filterws_params_for_js() {
    global $OUTPUT;

    // List of predefined filters.
    $predefined = [];
    $predefinedstr = get_config('atto_filterws', 'predefined');

    if ($predefinedstr) {
        $entries = preg_split('/\r\n|\r|\n/', $predefinedstr);

        foreach ($entries as $entry) {
            $fields = explode('|', $entry);

            if (count($fields) < 2) {
                continue;
            }

            $predefined[] = [
                'name' => $fields[0],
                'origin' => $fields[1],
                'useragent' => $fields[2]
            ];
        }
    }

    $params = [
        'help' => [
            'filteruseragent' => $OUTPUT->help_icon('filteruseragent', 'atto_filterws'),
            'origin' => $OUTPUT->help_icon('origin', 'atto_filterws')
        ],
        'predefined' => $predefined
    ];

    return $params;
}
