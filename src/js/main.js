import angular from 'angular';
import registerControllers from './controllers';
const ngModule = angular.module('Swapi', []);
registerControllers(ngModule);
require('../less/main.less');