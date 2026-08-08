import '@popperjs/core';
import 'bootstrap';
import 'mdui/mdui.css';
import 'mdui';
import $ from "jquery";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import "@phosphor-icons/web/thin";
import "@phosphor-icons/web/regular";
import "@phosphor-icons/web/duotone";
import "@phosphor-icons/web/fill";

import { getDeviceId } from './libs/deviceId';

$(function(){
    getDeviceId();
});

