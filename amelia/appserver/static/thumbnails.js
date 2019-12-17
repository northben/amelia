require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {

    var ThumbnailRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Only use the cell renderer for the thumbnail field
            return cell.field === 'thumbnail';
        },
        render: function($td, cell) {
            // Create the thumbnail tag and add it to the table cell
            $td.html(_.template('<img src="<%-thumbnail%>" />', {
                thumbnail: cell.value,
            }));
        }
    });
    mvc.Components.get('table1').getVisualization(function(tableView){
        // Register custom cell renderer, the table will re-render automatically
        tableView.addCellRenderer(new ThumbnailRenderer());
    });
});
