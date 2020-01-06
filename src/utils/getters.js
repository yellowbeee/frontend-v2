import store from '@/store'
import formatter from '@/utils/timeFormatter'

let Getters = {};

Getters.item = {
  byItemId(itemId) {
    // if (itemId === "furni") return {
    //   "itemId": "furni",
    //   "name": "家具",
    //   "sortId": 9999,
    //   "rarity": 0,
    //   "itemType": "FURN",
    //   "spriteCoord": [0, 0]
    // };
    return this.all().find(el => {
      return el.itemId === itemId
    })
  },
  all() {
    if (!store.state.data.items) return [];
    return store.state.data.items
  }
}
Getters.limitations = {
  byStageId(stageId) {
    return store.state.data.limitations.find(el => {
      return el.name === stageId
    })
  }
}
Getters.statistics = {
  byItemId(itemId) {
    return store.state.data[`${store.state.dataSource}Matrix`].matrix.filter(el => {
      return el.itemId === itemId
    })
  },
  byStageId(stageId) {
    return store.state.data[`${store.state.dataSource}Matrix`].matrix.filter(el => {
      return el.stageId === stageId
    })
  }
}
Getters.stages = {
  all() {
    return store.state.data.stages
  },
  byStageId(stageId) {
    return this.all().find(el => {
      return el.stageId === stageId
    })
  },
  byParentZoneId(zoneId) {
    return this.all().filter(el => {
      return el.zoneId === zoneId
    })
  }
}
Getters.zones = {
  byZoneId(zoneId) {
    return this.all().find(el => {
      return el.zoneId === zoneId
    })
  },
  byType(type) {
    return this.all().filter(el => {
      return el.type === type
    });
  },
  all() {
    let zones = store.state.data.zones;
    if (!zones) return [];
    return zones
  }
}
Getters.trends = {
  byItemId(itemId) {
    let temp = {};
    let trends = this.all();
    if (trends) {
      Object.keys(trends).map(key => {
        if (
          trends[key] &&
          trends[key]["results"] &&
          trends[key]["results"][itemId]
        ) {
          temp[key] = {};
          temp[key]["results"] = trends[key]["results"][
            itemId
          ];
          temp[key]["interval"] = trends[key]["interval"];
          temp[key]["startTime"] = trends[key]["startTime"];
        }
      });
    }
    return temp;
  },
  byStageId(stageId) {
    return this.all() && this.all()[stageId];
  },
  all() {
    if (store.state.dataSource !== 'global') {
      return null;
    }
    return store.state.data && store.state.data.trends && store.state.data.trends.results
  }
}

export default Getters