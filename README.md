Atto button for WebService filter plugin
====================================

This plugin makes it easier to include the WebService filter tags in the content while using the Atto editor. It will allows you to add a new button in the Atto toolbar to add these tags.

# To Install it manually #

- Unzip the plugin in the moodle .../lib/editor/atto/plugins/ directory.
- Enable it from "Site Administration >> Plugins >> Text editors >> Atto toolbar settings". You should include the "filterws" in the "Toolbar config".

# To Use it #

- Once enabled, a new button will appear in the toolbar of the Atto editor.
- While creating/editing some content using the Atto editor, select the text to filter and click the "WS" button.
- In the new dialog, select the Origin and the User Agent (optional) you want to apply to the filter.
- Click "Insert" and the tags will be added to the content.

# Predefined filters #

The site admin can create some predefined filters that users will be able to apply, that way they don't need to remember the Origin and User Agent to apply. By default, this plugin includes a predefined filter to display some content in the official Moodle app.

To define these prdefined plugins, go to "Site Administration >> Plugins >> Text editors >> WebService Filter settings >> Predefined filters".
