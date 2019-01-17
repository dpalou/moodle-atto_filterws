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

var COMPONENTNAME = 'atto_filterws',
    ORIGINS = [ // Possible origins.
        {
            name: 'web',
            str: 'originweb',
            value: 'web'
        },
        {
            name: 'ws',
            str: 'originws',
            value: 'ws'
        },
        {
            name: 'any',
            str: 'originany',
            value: 'any'
        }
    ],

    CSS = {
        FORM: 'atto_filterws_form',
        INPUTPREDEFINED: 'atto_filterws_predefined',
        INPUTORIGIN: 'atto_filterws_origin',
        INPUTUSERAGENT: 'atto_filterws_useragent',
        INPUTSUBMIT: 'atto_filterws_submit',
        FILTERUSERAGENT: 'atto_filterws_filteruseragent',
        APPLYPREDEFINED: 'atto_filterws_apply_predefined'
    },

    TEMPLATE = '' +
        '<form class="atto_form {{CSS.FORM}}">' +
            // Add the predefined filters selector.
            '{{#if hasPredefined}}' +
                '<div class="form-inline m-b-1">' +
                    '<label class="for="{{elementid}}_{{CSS.INPUTPREDEFINED}}">{{get_string "predefined" component}}</label>' +
                    '<div class="input-group input-append w-100">' +
                        '<select class="custom-select {{CSS.INPUTPREDEFINED}}" id="{{elementid}}_{{CSS.INPUTPREDEFINED}}">' +
                            '{{#each predefined}}' +
                                '<option value="{{@index}}">{{name}}</option>' +
                            '{{/each}}' +
                        '</select>' +
                        '<span class="input-group-append">' +
                            '<button class="btn btn-default {{CSS.APPLYPREDEFINED}}" type="button">' +
                            '{{get_string "apply" component}}</button>' +
                        '</span>' +
                    '</div>' +
                '</div>' +
            '{{/if}}' +

            // Add the origin selector.
            '<div class="form-inline m-b-1">' +
                '<label class="for="{{elementid}}_{{CSS.INPUTORIGIN}}">{{get_string "origin" component}}' +
                    ' {{{helpStrings.origin}}}</label>' +
                '<select class="custom-select {{CSS.INPUTORIGIN}}" id="{{elementid}}_{{CSS.INPUTORIGIN}}">' +
                    '{{#each origins}}' +
                        '<option value="{{value}}">{{get_string str ../component}}</option>' +
                    '{{/each}}' +
                '</select>' +
            '</div>' +

            // Filter by user agent.
            '<div class="m-b-1">' +
                '<label for="{{elementid}}_{{CSS.INPUTUSERAGENT}}">{{get_string "filteruseragent" component}}' +
                    ' {{{helpStrings.filteruseragent}}}</label>' +
                '<input class="form-control fullwidth {{CSS.INPUTUSERAGENT}}" type="text" value="" ' +
                'id="{{elementid}}_{{CSS.INPUTUSERAGENT}}" size="32"/>' +
            '</div>' +

            // Add the submit button and close the form.
            '<button class="btn btn-default {{CSS.INPUTSUBMIT}}" type="submit">{{get_string "insert" component}}</button>' +
        '</form>';

Y.namespace('M.atto_filterws').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    initializer: function() {
        this.addButton({
            icon: 'icon',
            iconComponent: 'atto_filterws',
            title: 'addfilterws',
            buttonName: 'addfilterws',
            callback: this._displayDialogue
        });
    },

    /**
     * Display the WS filter dialog.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function() {
        // Store the current selection.
        this._currentSelection = this.get('host').getSelection()[0];

        if (!this._currentSelection) {
            return;
        }

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('insertfilterws', COMPONENTNAME),
            focusAfterHide: true
        }, true);

        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent()).show();
    },

    /**
     * Return the dialogue content for the tool.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getDialogueContent: function() {
        var template = Y.Handlebars.compile(TEMPLATE),
            predefined = this.get('predefined'),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                component: COMPONENTNAME,
                origins: ORIGINS,
                helpStrings: this.get('help'),
                hasPredefined: predefined && predefined.length > 0,
                predefined: predefined
            }));

        this._form = content;

        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._addFilterTag, this);

        if (predefined && predefined.length > 0) {
            this._form.one('.' + CSS.APPLYPREDEFINED).on('click', this._applyPredefined, this);
        }

        return content;
    },

    /**
     * Apply a predefined filter.
     *
     * @method _applyPredefined
     * @param {EventFacade} e
     * @private
     */
    _applyPredefined: function(e) {
        e.preventDefault();

        var selected = this._form.one('.' + CSS.INPUTPREDEFINED).get('value'),
            filter = this.get('predefined')[selected];

        if (filter) {
            // Update the inputs.
            this._form.one('.' + CSS.INPUTORIGIN).set('value', filter.origin);
            this._form.one('.' + CSS.INPUTUSERAGENT).set('value', filter.useragent || '');
        }
    },

    /**
     * Adds a filter WS tag surrounding the currently selected content.
     *
     * @method _addFilterTag
     * @param {EventFacade} e
     * @private
     */
    _addFilterTag: function(e) {
        e.preventDefault();

        var form = this._form,
            origin = form.one('.' + CSS.INPUTORIGIN).get('value'),
            userAgent = form.one('.' + CSS.INPUTUSERAGENT).get('value'),
            selection = this._currentSelection,
            focusElement = null;

        if (selection) {
            // The function insertContentAtFocusPoint can insert extra tags, so we won't use it.
            // Search the starting and ending text nodes to use.
            var endText = this._getTextElement(selection.endContainer, selection.endOffset),
                startText = this._getTextElement(selection.startContainer, selection.startOffset);

            if (startText && endText) {

                if (startText === endText && selection.startOffset === 0 && selection.endOffset === startText.data.length) {
                    // User selected the whole text. Check if we should wrap the parent instead of just the text.
                    var nodeToWrap = this._searchParentToWrap(startText);

                    if (nodeToWrap != startText && nodeToWrap.parentNode) {
                        // We should wrap a certain node, re-calculate the texts to use.
                        var parent = nodeToWrap.parentNode,
                            position = Array.from(parent.childNodes).indexOf(nodeToWrap);

                        if (position != -1) {
                            // Create new texts elements and insert them in the right place.
                            startText = document.createTextNode('');
                            endText = document.createTextNode('');

                            var nextElement = parent.childNodes[position + 1];
                            if (nextElement) {
                                parent.insertBefore(endText, nextElement);
                            } else {
                                parent.appendChild(endText);
                            }

                            parent.insertBefore(startText, nodeToWrap);
                        }
                    }
                }

                // Add the filter tags in the contents of each of the texts.
                // If it's a child text, don't use any offset.
                var offset = endText === selection.endContainer ? selection.endOffset : 0;

                // Close the tag.
                endText.data = endText.data.substring(0, offset) + '{fws}' + endText.data.substring(offset);

                // If it's a child text, don't use any offset.
                offset = startText === selection.startContainer ? selection.startOffset : 0;

                // Open the tag.
                var tag = '{fws ' + origin + (userAgent ? (' ua="' + userAgent + '"') : '') + '}';
                startText.data = startText.data.substring(0, offset) + tag + startText.data.substring(offset);

                // Determine the element to focus after hiding the dialogue.
                if (selection.startContainer.nodeType == Node.TEXT_NODE) {
                    focusElement = selection.startContainer.parentElement;
                } else {
                    focusElement = selection.startContainer;
                }
            } else {
                window.console.warn('Could not find the right elements to insert the fws tag.');
            }

            // And mark the text area as updated.
            this.markUpdated();
        } else {
            window.console.warn('Could not find a selection to insert the fws tag.');
        }

        // Hide the dialogue.
        this.getDialogue({
            focusAfterHide: focusElement
        }).hide();
    },

    /**
     * If the supplied node is a Text node, return it. Otherwise, create a child Text node at a certain position.
     *
     * @method _getTextElement
     * @param {Node} node The node to search in.
     * @param {Number} offset The offset to check.
     * @return {Node} The text node to use.
     * @private
     */
    _getTextElement: function(node, offset) {
        var newText;

        if (node.nodeType == Node.TEXT_NODE) {
            // It's already a text node, return it.
            return node;
        } else if (node.childNodes) {

            if (offset >= node.childNodes.length) {
                // Create a new Text node and add it to the end.
                newText = document.createTextNode('');

                node.appendChild(newText);

                return newText;
            } else {
                var childNode = node.childNodes[offset];

                if (childNode.nodeType == Node.TEXT_NODE) {
                    // The position already contains a text node, use it.
                    return childNode;
                } else {
                    // Create a new Text node and add it to the right position.
                    newText = document.createTextNode('');

                    node.insertBefore(newText, childNode);

                    return newText;
                }
            }
        }
    },

    /**
     * Find the element that should be wrapped with the filter.
     * If the current node is the only child of the parent, wrap the whole parent.
     *
     * @method _searchParentToWrap
     * @param {Node} node The node to check.
     * @return {Node} The node to wrap.
     * @private
     */
    _searchParentToWrap: function(node) {
        var parent = node.parentNode;

        if (parent && parent.childNodes && parent.childNodes.length === 1) {
            // Current node is  the only node in the parent, we can wrap the whole parent.
            return this._searchParentToWrap(parent);
        } else {
            // Current node has siblings, we can't wrap the parent. Return current node.
            return node;
        }
    }
}, {
    ATTRS: {
        help: {},
        predefined: []
    }
});
