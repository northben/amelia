
# Amelia

Amelia is an infamous explorer of Splunk knowledge!

### Sourcetype Explorer

Ever feel like you're stumbling around in the dark, trying to discover the relevant search-time field extractions? Do you struggle to remember the order of search-time operations? Amelia's Sourcetype Explorer dashboard is just what you need!

**Explore a search head, app, props.conf stanza, and select metadata**
![Explore a search head, app, props.conf stanza, and select metadata](https://ben-repo-artifacts.s3.us-west-2.amazonaws.com/2019-10-29_11-42-21.gif)

**Explore all search-time field configurations**
![Explore all search-time field configurations](https://ben-repo-artifacts.s3.us-west-2.amazonaws.com/2019-10-29_11-54-12.gif)

**Explore event types their tags, and tags added to event types**
![Explore event types their tags, and tags added to event types](https://ben-repo-artifacts.s3.us-west-2.amazonaws.com/2019-10-29_12-18-36.gif)

The sourcetype explorer dashboard lists all search-time operations for the selected search head, props.conf stanza, and app. Optionally display metadata. Identify tags produced by event types, and event types related to each tag, etc.

### Saved Search Explorer

Trying to tame your saved searches? Amelia's Saved Search Explorer dashboard is just what you need!

**Explore searches by search head, app, and attributes**
Display fields, and search for text in any visible field. Searches are quantified according to the selected attributes and listed in a table. *Disable/enable a search with one click!*

![Demo of Saved Search Explorer dashboard](https://ben-repo-artifacts.s3.us-west-2.amazonaws.com/2019-10-29_14-09-17.gif)

#### Customize the attributes lookup table
The [lookup file](https://github.com/northben/amelia/blob/master/lookups/amelia_saved_search_attributes.csv) contains some attributes that identify saved searches that are sometimes the cause of performance problems, and you can add any other attributes to find searches that are important to you.

Get busy exploring!
