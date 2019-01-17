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
 * Settings that allow configuring various filterws features.
 *
 * @package    atto_filterws
 * @copyright  2019 Dani Palou <dani@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editoratto', new admin_category('atto_filterws', new lang_string('pluginname', 'atto_filterws')));

$settings = new admin_settingpage('atto_filterws_settings', new lang_string('settings', 'atto_filterws'));
if ($ADMIN->fulltree) {
    // Predefined filters.
    $name = new lang_string('predefined', 'atto_filterws');
    $desc = new lang_string('predefined_desc', 'atto_filterws');
    $default = 'Official Moodle App|ws|MoodleMobile\s?$';
    $setting = new admin_setting_configtextarea('atto_filterws/predefined',
                                                $name,
                                                $desc,
                                                $default);
    $settings->add($setting);
}
