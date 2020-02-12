require([
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/eventsviewerview',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc',
    'underscore',
    'splunkjs/mvc/simplexml/ready!'
],function(TableView, EventsViewerView, SearchManager, mvc, _) {
    var EventSearchBasedRowExpansionRenderer = TableView.BaseRowExpansionRenderer.extend({
        initialize: function(args) {
            this._searchManager = new SearchManager({
                id: 'details-search-manager',
                preview: false
            });
            this._chartView = new EventsViewerView({
                managerid: 'details-search-manager',
                type: "raw",
                'raw.drilldown': "none"
            });
        },
        canRender: function(rowData) {
            return true;
        },
        render: function($container, rowData) {
            var sourcetypeCell = _(rowData.cells).find(function (cell) {
               return cell.field === 'sourcetype';
            });

            var indexCell = _(rowData.cells).find(function (cell) {
               return cell.field === 'index';
            });
            this._searchManager.set({ search: `index=${indexCell.value} sourcetype=${sourcetypeCell.value} | dedup punct`});
            $container.append(this._chartView.render().el);
        }
    });
    var tableElement = mvc.Components.getInstance("table1");
    tableElement.getVisualization(function(tableView) {
        tableView.addRowExpansionRenderer(new EventSearchBasedRowExpansionRenderer());
    });
});
