require([
  'splunkjs/mvc',
  'splunkjs/mvc/tableview',
  'splunkjs/mvc/searchmanager',
  'splunkjs/mvc/simplexml/ready!'
], function(mvc, TableView, SearchManager, _) {
  var searchTable = splunkjs.mvc.Components.get('searchTable')

  // remove the id field from the result table - it's not human friendly but we need it in order to edit the search
  searchTable.getVisualization(function(tableView) {
    var searchManager = tableView['managers'][0]['name']
    var searchManager = splunkjs.mvc.Components.get(searchManager)

    var theData = searchManager.data('results', { count: 1 })

    theData.on('data', function(d) {
      if (typeof theData.data() !== 'undefined') {
        tableView.settings.set('fields', removeIdFieldFromTable(d.data()['fields'])
        )
      }
    })
  })

  // allow users to edit search properties by selecting a choice in the "edit" field
  searchTable.on('click', function(e) {
    e.preventDefault()

    var clickedCell = e.data['click.name2']
    if (clickedCell == 'edit') {
      var url = convertRestUrlToSplunkWebUrl(e.data['row.id'])
      var editAction = e.data['click.value2']
      editSearch(url, editAction)
    }
  })

  function removeIdFieldFromTable(fields) {
    return fields.filter(function(item) {
      return item !== 'id'
    })
  }

  function post(path, parameters) {
    var form = $('<form></form>')
    form.attr('method', 'post')
    form.attr('action', path)

    $.each(parameters, function(key, value) {
      var field = $('<input></input>')
      field.attr('type', 'hidden')
      field.attr('name', key)
      field.attr('value', value)
      form.append(field)
    })

    $(document.body).append(form)
    form.submit()
  }

  function editSearch(url, data) {
    var http = new splunkjs.SplunkWebHttp()

    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    var parameterMap = {
      disable: {
        disabled: 1
      },
      enable: {
        disabled: 0
      }
    }

    var arguments = parameterMap[data]

    http.post(url, headers, arguments)
  }

  function convertRestUrlToSplunkWebUrl(url) {
    return url.replace(/.*?:8089/g, '')
  }

})
