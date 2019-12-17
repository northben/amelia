require([
  'underscore',
  'jquery',
  'splunkjs/mvc',
  'splunkjs/mvc/tableview',
  'splunkjs/mvc/searchmanager',
  'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView, SearchManager) {
  var searchTable = splunkjs.mvc.Components.get('searchTable')

  // remove the id field from the result table - it's not human friendly but we need it in order to edit the search
  searchTable.getVisualization(function(tableView) {
    var searchManager = splunkjs.mvc.Components.get(tableView['managers'][0]['name'])

    var searchTableData = searchManager.data('results', { count: 1 })

    removeIdFieldFromSearchTable(searchTableData, tableView)
  })

  // allow users to edit search properties by selecting a choice in the "edit" field
  searchTable.on('click', function(e) {
    e.preventDefault()

    handleClickOnEdit(e)
  })

  function removeIdFieldFromSearchTable(searchTableData, tableView) {
    searchTableData.on('data', function(d) {
      if (typeof searchTableData.data() !== 'undefined') {
        tableView.settings.set('fields', removeIdFieldFromTable(d.data()['fields'])
        )
      }
    })
  }

  function handleClickOnEdit(e) {
    if (e.data['click.name2'] == 'edit') {
      var url = convertRestUrlToSplunkWebUrl(e.data['row.id'])
      var editAction = e.data['click.value2']
      editSearch(url, editAction)
    }
  }

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
