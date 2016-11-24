class Game

  def self.start(uuid1, uuid2)
    # Start left, start right = randomise.
    leftStart, rightStart = [uuid1, uuid2].shuffle

    ActionCable.server.broadcast "game", {action: "game_start", msg: "leftStart"}
    ActionCable.server.broadcast "game", {action: "game_start", msg: "rightStart"}

    $redis.set("opponent_for:#{leftStart}", rightStart)
    $redis.set("opponent_for:#{rightStart}", leftStart)

    puts "======================================================================="
    puts "Start game: leftStart: " + leftStart
    puts "Start game: rightStart: " + rightStart
    puts "_______________________________________________________________________"

  end

  def self.make_move(uuid, data)
    opponent = opponent_for(uuid)

    ActionCable.server.broadcast "game", {action: "make_move"}
  end



  def self.opponent_for(uuid)
    $redis.get("opponent_for:#{uuid}")
  end


  def self.forfeit(uuid)
    if winner = opponent_for(uuid)
      ActionCable.server.broadcast "player_#{winner}", {action: "opponent_forfeits"}
    end
  end

end
