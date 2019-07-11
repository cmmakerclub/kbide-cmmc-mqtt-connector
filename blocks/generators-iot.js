  Blockly.JavaScript['mqtt_connector_begin'] = function(block) {
    let value_host = Blockly.JavaScript.valueToCode(block, "HOST", Blockly.JavaScript.ORDER_NONE);
    let value_username = Blockly.JavaScript.valueToCode(block, "USERNAME", Blockly.JavaScript.ORDER_NONE);
    let value_password = Blockly.JavaScript.valueToCode(block, "PASSWORD", Blockly.JavaScript.ORDER_NONE);
    let value_clientid = Blockly.JavaScript.valueToCode(block, "CLIENT_ID", Blockly.JavaScript.ORDER_NONE);
    let value_prefix = Blockly.JavaScript.valueToCode(block, "PREFIX", Blockly.JavaScript.ORDER_NONE);
    let value_devicename = Blockly.JavaScript.valueToCode(block, "NAME", Blockly.JavaScript.ORDER_NONE);
    let value_publish = Blockly.JavaScript.valueToCode(block, "PUBLISH", Blockly.JavaScript.ORDER_NONE);
  
    let code = `
    #EXTINC #include <MQTT.h> #END
    #EXTINC #include <MqttConnector.h> #END
    #EXTINC #include <PubSubClient.h> #END
    #EXTINC MqttConnector* mqtt;#END
    #VARIABLE String DEVICE_NAME      = ${value_devicename}; #END 
    #VARIABLE String MQTT_HOST        = ${value_host}; #END
    #VARIABLE String MQTT_USERNAME    = ${value_username}; #END
    #VARIABLE String MQTT_PASSWORD    = ${value_password}; #END    
    #VARIABLE String MQTT_CLIENT_ID   = ${value_clientid}; #END
    #VARIABLE String MQTT_PREFIX      = ${value_prefix}; #END
    #VARIABLE int MQTT_PORT           = 1883; #END
    #VARIABLE int PUBLISH_EVERY       = ${value_publish} * 1000; #END
    #VARIABLE int MQTT_CONNECT_TIMEOUT= 10; #END
  
    #SETUPmqtt = new MqttConnector(MQTT_HOST.c_str(), MQTT_PORT);#END
    #SETUPmqtt->on_connecting([&](int counter, bool *flag) {#END
    #SETUP  if (counter >= MQTT_CONNECT_TIMEOUT) { #END
    #SETUP    ESP.restart(); #END
    #SETUP  } #END
    #SETUP  delay(1000); });#END  
  
    #SETUPmqtt->on_prepare_configuration([&](MqttConnector::Config *config) -> void { #END
    #SETUP  MQTT_CLIENT_ID = String(WiFi.macAddress()); #END
    #SETUP  config->clientId  = MQTT_CLIENT_ID; #END
    #SETUP  config->channelPrefix = MQTT_PREFIX; #END
    #SETUP  config->enableLastWill = true; #END
    #SETUP  config->retainPublishMessage = false; #END
    #SETUP  config->mode = MODE_BOTH; #END
    #SETUP  config->firstCapChannel = false; #END
    #SETUP  config->username = String(MQTT_USERNAME); #END
    #SETUP  config->password = String(MQTT_PASSWORD); }); #END
    #BLOCKSETUP mqtt->connect(); #END
    #LOOP_EXT_CODE mqtt->loop(); #END
  
    `;
     return code;
  };
  
  Blockly.JavaScript['mqtt_connector_publish'] = function(block) {
    let value_topic = Blockly.JavaScript.valueToCode(block, "TOPIC", Blockly.JavaScript.ORDER_NONE);
    let value_message = Blockly.JavaScript.valueToCode(block, "MSG", Blockly.JavaScript.ORDER_NONE);
  
    let code = `
    #SETUPstrcpy(myName, DEVICE_NAME.c_str()); #END
    #SETUPmqtt->on_prepare_data_once([&](void) { Serial.println("initializing sensor..."); }); #END
    #SETUPmqtt->on_before_prepare_data([&](void) { Serial.println("Read sensor..."); readSensor(); });#END
  
    #SETUPmqtt->on_prepare_data([&](JsonObject *root) { #END
    #SETUP  Serial.println("on_prepare_data..."); #END
    #SETUP  JsonObject& data = (*root)["d"]; #END
    #SETUP  JsonObject& info = (*root)["info"]; #END
    #SETUP  data["myName"] = myName; #END
    #SETUP  data["millis"] = millis(); #END
    #SETUP  data[${value_topic}] = ${value_message}; #END
    #SETUP  data["updateInterval"] = PUBLISH_EVERY; #END
    #SETUP}, PUBLISH_EVERY); #END
    
    #SETUPmqtt->on_after_prepare_data([&](JsonObject * root) {}); #END
    #SETUPmqtt->on_published([&](const MQTT::Publish & pub) { Serial.println("Published."); }); #END
  
    `;
    return code;
  };
  
  Blockly.JavaScript['mqtt_connector_send_command'] = function(block) {
    // var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['mqtt_connector_receive'] = function(block) {
    // let value_topic = Blockly.JavaScript.valueToCode(block, "TOPIC", Blockly.JavaScript.ORDER_NONE);
    // let value_message = Blockly.JavaScript.valueToCode(block, "MSG", Blockly.JavaScript.ORDER_NONE);
  
    let code = `
    #SETUPmqtt->on_subscribe([&](MQTT::Subscribe *sub) -> void { #END
    #SETUP  sub->add_topic(MQTT_PREFIX + myName + "/$/+"); #END
    #SETUP  sub->add_topic(MQTT_PREFIX + MQTT_CLIENT_ID + "/$/+"); }); #END
  
    #SETUPmqtt->on_before_message_arrived_once([&](void) { }); #END
    #SETUPmqtt->on_message([&](const MQTT::Publish & pub) { }); #END
  
    #SETUPmqtt->on_after_message_arrived([&](String topic, String cmd, String payload) { #END
    #SETUP  if (cmd == "$/command") { #END
    #SETUP    if (payload == "ON") { digitalWrite(relayPin, LOW); } #END
    #SETUP    else if (payload == "OFF") { digitalWrite(relayPin, HIGH);} #END
    #SETUP  } else if (cmd == "$/reboot") { ESP.restart(); #END
    #SETUP  } else { } }); #END
    `;
    return code;
  };