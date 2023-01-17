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
 * Strings for component 'atto_filterws', language 'en'.
 *
 * @package    atto_filterws
 * @copyright  2019 Dani Palou <dani@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['addfilterws'] = 'Afegir etiqueta de Filtre de Serveis web';
$string['apply'] = 'Aplicar';
$string['filteruseragent'] = 'Filtrar per User Agent';
$string['filteruseragent_help'] = 'Si s\'introdueix algun valor, el contingut sel·leccionat només es mostrarà si el User Agent conté aquest valor. El valor introduït es convertirà en una expressió regular.';
$string['insert'] = 'Introduir';
$string['insertfilterws'] = 'Introduir filtre de Serveis Web';
$string['origin'] = 'Origen';
$string['origin_help'] = 'Web: Mostrar només a navegador.<br>Servei web: Mostrar només en un client de Servei web, com l\'app de Moodle.<br>Qualsevol: Mostrar per qualsevol origen.';
$string['originany'] = 'Qualsevol';
$string['originweb'] = 'Web';
$string['originws'] = 'Servei web';
$string['pluginname'] = 'Filtre de Serveis web per Atto';
$string['predefined'] = 'Filtres predefinits';
$string['predefined_desc'] = 'Llistat de filtres predefinits que els usuaris podran utilitzar a l\'editor Atto.

Introdueix cada filtre en una nova línia amb el següent format: nom a mostrar, origen (web, ws o any) i User Agent (opcional), separats per un caràcter "|". Per exemple:
<pre>
    Moodle App|ws|MoodleMobile
</pre>';
$string['privacy:metadata'] = 'El connector atto_filterws no emmagatzema informació personal.';
$string['settings'] = 'Configuració del filtre de Serveis web';
