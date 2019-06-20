
# Amelia

Amelia is an infamous explorer of Splunk knowledge!

### Sourcetype Explorer

Ever feel like you're stumbling around in the dark, trying to discover the relevant search-time field extractions? Do you struggle to remember the order of search-time operations? Amelia's Sourcetype Explorer dashboard is just what you need!

![Demo of Sourcetype Explorer dashboard](demo_sourcetype_explorer.gif)


The sourcetype explorer dashboard lists all search-time operations for the selected search head, props.conf stanza, and app. Optionally display metadata. Identify tags produced by event types, and event types related to each tag, etc.

### Saved Search Explorer

Trying to tame your saved searches? Amelia's Saved Search Explorer dashboard is just what you need!

![Demo of Saved Search Explorer dashboard](demo_saved_search_explorer.gif)

#### Customize the attributes lookup table
The [lookup file](https://github.com/northben/amelia/blob/master/amelia/lookups/amelia_saved_search_attributes.csv) contains some attributes that identify saved searches that are the cause problems of some performance problems, and you can add any other attributes to find searches that are important to you.

Get busy exploring!
