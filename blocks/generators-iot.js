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

static char myName[80];

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
    
strcpy(myName, DEVICE_NAME.c_str());
mqtt = new MqttConnector(MQTT_HOST.c_str(), MQTT_PORT); 
mqtt->on_connecting([&](int counter, bool *flag) { 
  if (counter >= MQTT_CONNECT_TIMEOUT) {  
    ESP.restart();  
  } 
  Serial.println("MQTT Connecting..");
}); 

mqtt->on_subscribe([&](MQTT::Subscribe *sub) -> void {
  Serial.printf("myName = %s \\r\\n", myName);
  String t1 = MQTT_PREFIX + myName + "/$/+";
  String t2 = MQTT_PREFIX + MQTT_CLIENT_ID + "/$/+";
  Serial.println("START TOPIC SUBS");
  Serial.println(t1);
  Serial.println(t2);
  Serial.println("DONE TOPIC SUBS");
  
  sub->add_topic(t1);
  sub->add_topic(t2);
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

Blockly.JavaScript["on_prepare_data"] = function(block) {
  var var_name = block.getFieldValue("var_name");
  var_name = "root";

  var on_prepare_data_do = Blockly.JavaScript.statementToCode(block,
    "on_prepare_data_do");

  var code = `
    mqtt->on_prepare_data([&](JsonObject *${var_name}) {
        JsonObject& data = (*${var_name})["d"];
        JsonObject& info = (*${var_name})["info"];
        data["myName"] = myName;
     ${on_prepare_data_do}
  }, PUBLISH_EVERY);
  `;
  return code;
};

Blockly.JavaScript["on_message"] = function(block) {
  var var_topic = block.getFieldValue("var_topic");
  var var_payload = block.getFieldValue("var_payload");
  var var_cmd = block.getFieldValue("var_cmd");

  var on_message_do = Blockly.JavaScript.statementToCode(block,
    "on_message_do");
  var code = `
  mqtt->on_after_message_arrived([&](String ${var_topic}, String ${var_cmd}, String ${var_payload}) { 
  ${on_message_do} 
  });
  `;
  return code;
};

Blockly.JavaScript["append_value"] = function(block) {
  var key = block.getFieldValue("KEY_NAME");
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
