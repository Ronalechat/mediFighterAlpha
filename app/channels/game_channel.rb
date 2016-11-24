# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "game"
    stream_from "player_#{uuid}"
    # ActionCable.server.broadcast "game", {message: "Connected as player_#{uuid}, player: #{$player1}"}
    p "REDIS:::: " + $redis.to_s
    Seek.create(uuid)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    Seek.remove(uuid)
    # Game.forfeit(uuid)
  end

  def self.forfeit(uuid)
    if winner = opponent_for(uuid)
      ActionCable.server.broadcast "game", {action: "opponent_forfeits"}
    end
  end

  def send_move(data)
    puts "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    p data
    ActionCable.server.broadcast "game", message: {move: data, player: uuid}
    
  end

  def make_move(data)
    # Game.make_move(uuid, data)
  end
end
