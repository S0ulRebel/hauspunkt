class Room {
    instalationType: string;
    isPrewallFullHeight: Boolean;
    hasSchacht: Boolean;
    hasRoomDivider: Boolean;
    hasPartitionWall: Boolean;

    constructor(
        instalationType: string,
        isPrewallFullHeight = false,
        hasSchacht = false,
        hasRoomDivider = false,
        hasPartitionWall = false,
      ) {
        this.instalationType = instalationType;
        this.isPrewallFullHeight = isPrewallFullHeight;
        this.hasRoomDivider = hasRoomDivider;
        this.hasPartitionWall = hasPartitionWall;
        this.hasSchacht = hasSchacht;
    }

    hasFixedPrewallHeight() {
        return this.isPrewallFullHeight || this.hasPartitionWall;
    }
}

export default Room;