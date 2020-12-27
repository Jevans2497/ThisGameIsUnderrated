class RoomLogger {

        // Isolate logging logic so that we can easily add additional steps later, such as writing logs to a file, etc.
        log(string) {
                console.log(string)
        }

        logRoomOnClose(timestamp, roomName, roomCreatedAtTime, numberOfWordsSeen, maxNumberOfPlayers) {
                this.log(JSON.stringify({
                        timestamp: timestamp,
                        timestamp_readable: new Date(timestamp),
                        room: roomName,
                        event_type: "CLOSE ROOM",
                        number_of_players: maxNumberOfPlayers,
                        number_of_words_seen: numberOfWordsSeen + 1,
                        room_created_at_time: roomCreatedAtTime,
                        room_age_seconds: Math.round((timestamp - roomCreatedAtTime) / 1000),
                        message: `Closing room '${roomName}'.`,
                }))
        }

        logRoomOnCreate(timestamp, roomName, createdBy) {
                this.log(JSON.stringify({
                        timestamp: timestamp,
                        timestamp_readable: new Date(timestamp),
                        room: roomName,
                        event_type: "CREATE ROOM",
                        created_by: createdBy,
                        message: `Player '${createdBy}' created new room '${roomName}'.`,
                }))
        }

        logPlayerJoinedRoom(timestamp, roomName, player) {
                this.log(JSON.stringify({
                        timestamp: timestamp,
                        timestamp_readable: new Date(timestamp),
                        room: roomName,
                        event_type: "JOIN ROOM",
                        player: player,
                        message: `New player '${player}' added to room '${roomName}'.`,
                }))
        }

        logPlayerDisconnected(timestamp, roomName, player) {
                this.log(JSON.stringify({
                        timestamp: timestamp, 
                        timestamp_readable: new Date(timestamp), 
                        room: roomName,
                        event_type: "LEAVE ROOM", 
                        player: player,
                        message: `Player '${player}' disconnected from room '${roomName}'.`,
                }))
        }
}

module.exports = RoomLogger