var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var require('prototype.spawn');

module.exports.loop = function () {
    //Memory loeschen
    for(let name in Memory.creeps){
        if(Game.creeps[name] == undefined){
            delete Memory.creeps[name];
        }
    }


    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }
    }

    var minimumNumberOfHarvester = 10;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 2;
    
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    var name = undefined;

    if(numberOfHarvesters < minimumNumberOfHarvester) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],undefined,
            { role:'harvester', working: false });
    }
    else if ( numberOfUpgraders < minimumNumberOfUpgraders) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE,MOVE],undefined,
            { role:'upgrader', working: false });
    }
    else if ( numberOfRepairers < minimumNumberOfRepairers) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],undefined,
            { role:'repairer', working: false });
    }
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],undefined,
            { role:'builder', working: false });
    }
    else {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],undefined,
            { role:'repairer', working: false });
    }

    if(!(name < 0)){
        console.log("Spanwn new creep: " + name + " || Role: "+ Game.creeps[name].memory.role);
    }
};