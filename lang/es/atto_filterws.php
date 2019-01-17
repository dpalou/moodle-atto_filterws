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

$string['addfilterws'] = 'Añadir etiqueta de filtro de Servicios Web';
$string['apply'] = 'Aplicar';
$string['filteruseragent'] = 'Filtrar por User Agent';
$string['filteruseragent_help'] = 'Si se introduce algun valor, el contenido seleccionado sólo se mostrará si el User Agent contiene este valor. El valor introducido se convertirá en una expresión regular.';
$string['insert'] = 'Insertar';
$string['insertfilterws'] = 'Insertar filtro de Servicios Web';
$string['origin'] = 'Origen';
$string['origin_help'] = 'Web: Mostrar sólo en navegador.<br>Servicio Web: Mostrar sólo en un cliente de Servicio Web, como la app de Moodle.<br>Cualquiera: Mostrar para cualquier origen.';
$string['originany'] = 'Cualquiera';
$string['originweb'] = 'Web';
$string['originws'] = 'Servicio Web';
$string['pluginname'] = 'Filtro de Servicios Web para Atto';
$string['predefined'] = 'Filtros predefinidos';
$string['predefined_desc'] = 'Listado de filtros predefinidos que los usuarios podrán utilizar en el editor Atto.

Introduce cada filtro en una nueva línea con el siguiente formato: nombre a mostrar, origen (web, ws o any) y User Agent (opcional), separados por un carácter "|". Por ejemplo:
<pre>
    Official Moodle App|ws|MoodleMobile
</pre>';
$string['privacy:metadata'] = 'La extensión atto_filterws no almacena información personal.';
$string['settings'] = 'Opciones del filtro de Servicios Web';
