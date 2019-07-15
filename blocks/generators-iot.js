Blockly.JavaScript["mqtt_connector_begin"] = function(block) {
  let value_host = block.getFieldValue("HOST");
  let value_username = block.getFieldValue("USERNAME");
  let value_password = block.getFieldValue("PASSWORD");
  let value_clientid = block.getFieldValue("CLIENT_ID");
  let value_prefix = block.getFieldValue("PREFIX");
  let value_devicename = block.getFieldValue("NAME");
  let value_publish = block.getFieldValue("PUBLISH");

  let code = `
    #EXTINC #include "MQTT.h" #END
    #EXTINC #include "MqttConnector.h" #END
    #EXTINC #include "PubSubClient.h" #END
    

#VARIABLE

String DEVICE_NAME      = "${value_devicename}";
String MQTT_HOST        = "${value_host}";
String MQTT_USERNAME    = "${value_username}";
String MQTT_PASSWORD    = "${value_password}";    
String MQTT_CLIENT_ID   = "${value_clientid}";
String MQTT_PREFIX      = "${value_prefix}";
int MQTT_PORT           = 1883;
int PUBLISH_EVERY       = ${value_publish} * 1000;
int MQTT_CONNECT_TIMEOUT= 10;

MqttConnector* mqtt;
#END

#SETUP
char myName[40];
    
strcpy(myName, DEVICE_NAME.c_str());
mqtt = new MqttConnector(MQTT_HOST.c_str(), MQTT_PORT); 
mqtt->on_connecting([&](int counter, bool *flag) { 
  if (counter >= MQTT_CONNECT_TIMEOUT) {  
    ESP.restart();  
  }  
  delay(1000);  
}); 
s
mqtt->on_subscribe([&](MQTT::Subscribe *sub) -> void {
  Serial.printf("myName = %s \\r\\n", myName);
  sub->add_topic(MQTT_PREFIX + myName + "/$/+");
  sub->add_topic(MQTT_PREFIX + MQTT_CLIENT_ID + "/$/+");
});
    
mqtt->on_prepare_configuration([&](MqttConnector::Config *config) -> void {
  MQTT_CLIENT_ID = String(WiFi.macAddress());
  config->clientId  = MQTT_CLIENT_ID;
  config->channelPrefix = MQTT_PREFIX;
  config->enableLastWill = true;
  config->retainPublishMessage = false;
  /*
      config->mode
      ===================
      | MODE_BOTH       |
      | MODE_PUB_ONLY   |
      | MODE_SUB_ONLY   |
      ===================
  */
  config->mode = MODE_BOTH;
  config->firstCapChannel = false;

  config->username = String(MQTT_USERNAME);
  config->password = String(MQTT_PASSWORD);

  // FORMAT
  // d:quickstart:<type-id>:<device-id>
  //config->clientId  = String("d:quickstart:esp8266meetup:") + macAddr;
  config->topicPub  = MQTT_PREFIX + String(myName) + String("/status");
});
#END


#LOOP_EXT_CODE mqtt->loop(); #END
    `;
  return code;
};

Blockly.JavaScript["mqtt_connector_publish"] = function(block) {
  // let value_topic = Blockly.JavaScript.valueToCode(block, "TOPIC", Blockly.JavaScript.ORDER_NONE);
  // let value_message = Blockly.JavaScript.valueToCode(block, "MSG", Blockly.JavaScript.ORDER_NONE);
  let value_data1 = block.getFieldValue("DATA1");
  let value_data2 = block.getFieldValue("DATA2");
  let value_data3 = block.getFieldValue("DATA3");

  var value_message1 = Blockly.JavaScript.valueToCode(block,
    "MSG1",
    Blockly.JavaScript.ORDER_ASSIGNMENT) || "0";
  var value_message2 = Blockly.JavaScript.valueToCode(block,
    "MSG2",
    Blockly.JavaScript.ORDER_ASSIGNMENT) || "0";
  var value_message3 = Blockly.JavaScript.valueToCode(block,
    "MSG3",
    Blockly.JavaScript.ORDER_ASSIGNMENT) || "0";

  let code = `
  mqtt->on_prepare_data_once([&](void) { Serial.println("initializing sensor..."); });
  mqtt->on_before_prepare_data([&](void) { Serial.println("Read sensor..."); });
  
  mqtt->on_prepare_data([&](JsonObject *root) {
    Serial.println("on_prepare_data...");
    JsonObject& data = (*root)["d"];
    JsonObject& info = (*root)["info"];
    data["myName"] = myName;
    data["millis"] = millis();
    data["${value_data1}"] = ${value_message1};
    data["${value_data2}"] = ${value_message2};
    data["${value_data3}"] = ${value_message3};
    data["updateInterval"] = PUBLISH_EVERY;
  }, PUBLISH_EVERY);
    
  mqtt->on_after_prepare_data([&](JsonObject * root) {});
  mqtt->on_published([&](const MQTT::Publish & pub) { Serial.println("Published."); });
  \n
  `;
  return code;
};

Blockly.JavaScript["on_prepare_data"] = function(block) {
  var var_name = block.getFieldValue("var_name");
  var_name = "root";

  var on_prepare_data_do = Blockly.JavaScript.statementToCode(block,
    "on_prepare_data_do");

  var code = `
    mqtt->on_prepare_data([&](JsonObject *${var_name}) {
        JsonObject& data = (*${var_name})["d"];
        JsonObject& info = (*${var_name})["info"];
     ${on_prepare_data_do}
  });
  `;
  return code;
};

Blockly.JavaScript["on_message"] = function(block) {
  var var_topic = block.getFieldValue("var_topic");
  var var_payload = block.getFieldValue("var_payload");
  //var var_topic = Blockly.JavaScript.valueToCode(block,
  //  "VAR_TOPIC", Blockly.JavaScript.ORDER_ATOMIC);

  var on_message_do = Blockly.JavaScript.statementToCode(block,
    "on_message_do");
  var code = `
  mqtt->on_after_message_arrived([&](String ${var_topic}, String cmd, String ${var_payload}) {
  ${on_message_do} 
  });
  `;
  return code;
};

Blockly.JavaScript["append_value"] = function(block) {
  var key = block.getFieldValue('KEY_NAME');
  var value_text = Blockly.JavaScript.valueToCode(block,
    "VALUE", Blockly.JavaScript.ORDER_ATOMIC);
  var code = ` data["${key}"] = ${value_text};\n`;
  ;
  return code;
};

Blockly.JavaScript["mqtt_connect"] = function(block) {
  var code = "mqtt->connect();\n";
  return code;
};

// Blockly.JavaScript['mqtt_connector_send_command'] = function(block) {
//   // var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
//   // TODO: Assemble JavaScript into code variable.
//   var code = '...;\n';
//   return code;
// };

// Blockly.JavaScript['mqtt_connector_receive'] = function(block) {
//   // let value_topic = Blockly.JavaScript.valueToCode(block, "TOPIC", Blockly.JavaScript.ORDER_NONE);
//   // let value_message = Blockly.JavaScript.valueToCode(block, "MSG", Blockly.JavaScript.ORDER_NONE);

//   let code = `
//   #SETUPmqtt->on_subscribe([&](MQTT::Subscribe *sub) -> void { #END
//   #SETUP  sub->add_topic(MQTT_PREFIX + myName + "/$/+"); #END
//   #SETUP  sub->add_topic(MQTT_PREFIX + MQTT_CLIENT_ID + "/$/+"); }); #END

//   #SETUPmqtt->on_before_message_arrived_once([&](void) { }); #END
//   #SETUPmqtt->on_message([&](const MQTT::Publish & pub) { }); #END

//   #SETUPmqtt->on_after_message_arrived([&](String topic, String cmd, String payload) { #END
//   #SETUP  if (cmd == "$/command") { #END
//   #SETUP    if (payload == "ON") { digitalWrite(relayPin, LOW); } #END
//   #SETUP    else if (payload == "OFF") { digitalWrite(relayPin, HIGH);} #END
//   #SETUP  } else if (cmd == "$/reboot") { ESP.restart(); #END
//   #SETUP  } else { } }); #END
//   `;
//   return code;
// };
