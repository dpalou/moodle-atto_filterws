YUI.add('moodle-atto_filterws-button', function (Y, NAME) {

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

/*
 * @package    atto_filterws
 * @copyright  2019 Dani Palou <dani@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_filterws-button
 */

/**
 * Atto text editor filterws plugin.
 *
 * @namespace M.atto_filterws
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

Y.namespace('M.atto_filterws').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        this.addButton({
            icon: 'icon',
            iconComponent: 'atto_filterws',
            title: 'addfilterws',
            buttonName: 'addfilterws',
            callback: this.addFilterTag
        });
    },

    /**
     * Adds a filter WS tag surrounding the currently selected content.
     *
     * @method addFilterTag
     */
    addFilterTag: function() {
        // Get the selected text.
        var host = this.get('host'),
            selection = host.getSelection();

        if (selection && selection[0]) {
            selection = selection[0];

            // The function insertContentAtFocusPoint can insert extra tags, so we won't use it.
            // Search the starting and ending text nodes to use, and add the tags in their contents.
            var endText = this._getTextElement(selection.endContainer, selection.endOffset),
                startText = this._getTextElement(selection.startContainer, selection.startOffset);

            if (startText && endText) {
                // If it's a child text, don't use any offset.
                var offset = endText === selection.endContainer ? selection.endOffset : 0;

                // Close the tag.
                endText.data = endText.data.substring(0, offset) + '{fws}' + endText.data.substring(offset);

                // If it's a child text, don't use any offset.
                offset = startText === selection.startContainer ? selection.startOffset : 0;

                // Open the tag.
                startText.data = startText.data.substring(0, offset) + '{fws web}' + startText.data.substring(offset);
            } else {
                window.console.warn('Could not find the right elements to insert the fws tag.');
            }

            // And mark the text area as updated.
            this.markUpdated();
        } else {
            window.console.warn('Could not find a selection to insert the fws tag.');
        }
    },

    /**
     * If the supplied node is a Text node, return it. Otherwise, create a child Text node at a certain position.
     *
     * @method findFirstText
     * @param {Node} node The node to search in.
     * @param {Number} offset The offset to check.
     * @return {Node} The text node to use.
     * @private
     */
    _getTextElement: function(node, offset) {
        if (node.nodeType == Node.TEXT_NODE) {
            // It's already a text node, return it.
            return node;
        } else if (node.childNodes) {

            if (offset >= node.childNodes.length) {
                // Create a new Text node and add it to the end.
                var newText = document.createTextNode('');

                node.appendChild(newText);

                return newText;
            } else {
                var childNode = node.childNodes[offset];

                if (childNode.nodeType == Node.TEXT_NODE) {
                    // The position already contains a text node, use it.
                    return childNode;
                } else {
                    // Create a new Text node and add it to the right position.
                    var newText = document.createTextNode('');

                    node.insertBefore(newText, childNode);

                    return newText;
                }
            }
        }
    }
});


}, '@VERSION@', {"requires": []});
