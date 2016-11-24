App.game = App.cable.subscriptions.create "GameChannel",
  connected: ->
    @printMessage("Waiting for a challenger...")
    # Called when the subscription is ready for use on the server

  printMessage: (message) ->
    $("#messages").append("<p>#{message}</p>")

  disconnected: ->
    # Called when the subscription has been terminated by the server

  sendMove: (data) ->
    @perform 'send_move', move: data, message: 'test'
    console.log('sendMove(): ', data)

  received: (data) ->
    console.log('got data: ', data)
    # Called when there's incoming data on the websocket for this channel
    # switch data.action
    #   when "game_start"#
    #   when "opponent_forfeits"
    #     @printMessage ("Opponent forfeits. You win!")
