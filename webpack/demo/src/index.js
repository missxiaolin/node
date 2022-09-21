var protobuf = require("protobufjs");
MatchStepInfo = function () {
    function t(t) {
        if (t)
            for (var e = Object.keys(t), o = 0; o < e.length; ++o) null != t[e[o]] &&
            (this[e[o]] = t[e[o]])
    }

    return t.prototype.chessIndex = 0, t.prototype.timeTag = 0, t.create = function (
        e) {
        return new t(e)
    }, t.encode = function (t, e) {
        return e || (e = protobuf.Writer.create()), null != t.chessIndex && Object.hasOwnProperty
            .call(t, "chessIndex") && e.uint32(8).int32(t.chessIndex), null !=
        t.timeTag && Object.hasOwnProperty.call(t, "timeTag") && e.uint32(
            16).int32(t.timeTag), e
    }, t.decode = function (t, e) {
        t instanceof protobuf.Reader || (t = protobuf.Reader.create(t));
        for (var o = void 0 === e ? t.len : t.pos + e, n = new MatchStepInfo; t
            .pos < o;) {
            var a = t.uint32();
            switch (a >>> 3) {
                case 1:
                    n.chessIndex = t.int32();
                    break;
                case 2:
                    n.timeTag = t.int32();
                    break;
                default:
                    t.skipType(7 & a)
            }
        }
        return n
    }, t
}()
MatchPlayInfo = function () {
    function t(t) {
        if (this.stepInfoList = [], t)
            for (var e = Object.keys(t), o = 0; o < e.length; ++o) null != t[e[o]] &&
            (this[e[o]] = t[e[o]])
    }

    return t.prototype.gameType = 0, t.prototype.mapId = 0, t.prototype.mapSeed = 0,
        t.prototype.stepInfoList = protobuf.util.emptyArray, t.create = function (e) {
        return new t(e)
    }, t.encode = function (t, e) {
        if (e || (e = protobuf.Writer.create()), null != t.gameType && Object.hasOwnProperty.call(
            t, "gameType") && e.uint32(8).int32(t.gameType), null != t.mapId &&
        Object.hasOwnProperty.call(t, "mapId") && e.uint32(16).int32(t.mapId),
        null != t.mapSeed && Object.hasOwnProperty.call(t, "mapSeed") && e.uint32(
            24).int32(t.mapSeed), null != t.stepInfoList && t.stepInfoList.length
        )
            for (var o = 0; o < t.stepInfoList.length; ++o) MatchStepInfo
                .encode(t.stepInfoList[o], e.uint32(34).fork()).ldelim();
        return e
    }, t.decode = function (t, e) {
        t instanceof protobuf.Reader || (t = protobuf.Reader.create(t));
        for (var o = void 0 === e ? t.len : t.pos + e, n = new MatchPlayInfo; t
            .pos < o;) {
            var a = t.uint32();
            switch (a >>> 3) {
                case 1:
                    n.gameType = t.int32();
                    break;
                case 2:
                    n.mapId = t.int32();
                    break;
                case 3:
                    n.mapSeed = t.int32();
                    break;
                case 4:
                    n.stepInfoList && n.stepInfoList.length || (n.stepInfoList = []),
                        n.stepInfoList.push(MatchStepInfo.decode(t,
                            t.uint32()));
                    break;
                default:
                    t.skipType(7 & a)
            }
        }
        return n
    }, t
}()
