require([
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc',
    'underscore',
    'splunkjs/mvc/simplexml/ready!'
],function(TableView, SearchManager, mvc, _) {
    var EventSearchBasedRowExpansionRenderer = TableView.BaseRowExpansionRenderer.extend({
        initialize: function(args) {
            this._searchManager = new SearchManager({
                id: 'details-search-manager',
                preview: false
            });
            this._chartView = new TableView({
                managerid: 'details-search-manager',
                drilldown: 'none',
                fields: '_time, _raw'

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
            this._searchManager.set({ search: `index=${indexCell.value} sourcetype=${sourcetypeCell.value} | dedup punct | head `});
            $container.append(this._chartView.render().el);
        }
    });
    var tableElement = mvc.Components.getInstance("table1");
    tableElement.getVisualization(function(tableView) {
        tableView.addRowExpansionRenderer(new EventSearchBasedRowExpansionRenderer());
    });
});
