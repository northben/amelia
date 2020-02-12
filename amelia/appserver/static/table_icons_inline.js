require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {
    var CustomIconRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            return cell.field === 'sourcetype';
        },
        render: function($td, cell) {
            var count = cell.value;
            // Compute the icon base on the field value
            var icon;
            icon = 'external';
            // Create the icon element and add it to the table cell
            $td.addClass('icon-inline numeric').html(_.template('<%- text %> <i class="icon-<%-icon%>"></i>', {
                icon: icon,
                text: cell.value
            }));
        }
    });
    mvc.Components.get('table1').getVisualization(function(tableView){
        // Register custom cell renderer, the table will re-render automatically
        tableView.addCellRenderer(new CustomIconRenderer());
    });


    var table = splunkjs.mvc.Components.get("table1");
    var tokens = mvc.Components.get('default');

    table.on("click", function(f) {

      f.preventDefault();

      if (f.data['click.name2'] == "sourcetype") {
        var earliest = tokens.get('field1.earliest')
        var latest = tokens.get('field1.latest')
        var url = `search?q=index=${f.data['row.index']} sourcetype=${f.data['row.sourcetype']}&earliest=${earliest}&latest=${latest}`
        var win = window.open(url, "_blank");
        win.focus;
      }
    });


});
