Blockly.Blocks["mqtt_connector_begin"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("MQTTConnector");
    this.appendDummyInput()
      .appendField("Device name:")
      .appendField(new Blockly.FieldTextInput("KB-001"), "NAME");
    this.appendDummyInput()
      .appendField("Host name: ")
      .appendField(new Blockly.FieldTextInput("mqtt.cmmc.io"), "HOST");
    this.appendDummyInput()
      .appendField("User name: ")
      .appendField(new Blockly.FieldTextInput(""), "USERNAME");
    this.appendDummyInput()
      .appendField("Password: ")
      .appendField(new Blockly.FieldTextInput(""), "PASSWORD");
    this.appendDummyInput()
      .appendField("Client ID: ")
      .appendField(new Blockly.FieldTextInput(""), "CLIENT_ID");
    this.appendDummyInput()
      .appendField("Prefix: ")
      .appendField(new Blockly.FieldTextInput("KBIDE/"), "PREFIX");
    this.appendDummyInput()
      .appendField("PUBLISH every: ")
      .appendField(new Blockly.FieldTextInput("10"), "PUBLISH");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip("CMMC MQTT Connector");
    this.setHelpUrl("www.kbide.org");
  }
};

Blockly.Blocks["mqtt_connector_publish"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("on MQTT publish");
    this.appendValueInput("MSG1")
      .appendField("data 1:")
      .appendField(new Blockly.FieldTextInput("value1"), "DATA1")
      .appendField("value:");
    this.appendValueInput("MSG2")
      .appendField("data 2:")
      .appendField(new Blockly.FieldTextInput("value2"), "DATA2")
      .appendField("value:");
    this.appendValueInput("MSG3")
      .appendField("data 3:")
      .appendField(new Blockly.FieldTextInput("value3"), "DATA3")
      .appendField("value:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip("mqtt_connector_publish");
    this.setHelpUrl("www.kbide.org");
  }
};

Blockly.Blocks["on_prepare_data"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("on_prepare_data")
      .appendField(new Blockly.FieldTextInput("root"), "var_name");

    //this.setInputsInline(true);
    this.appendStatementInput("on_prepare_data_do")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip("event when server got event");
    this.setHelpUrl("");
  }
};

//Blockly.Blocks["append_value"] = {
//  init: function() {
//    this.appendValueInput("number")
//      .setCheck(["Number", "int", "float", "double", "long"])
//      .appendField("Append value");
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
//    this.setColour(315);
//    this.setTooltip("Append Value");
//    this.setHelpUrl("");
//  }
//};

Blockly.Blocks["append_value"] = {
  init: function() {
    this.appendValueInput("KEY_NAME")
      .setCheck("String")
      .appendField("append value");
    this.appendValueInput("VALUE")
      .appendField("with");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Append value");
    this.setHelpUrl("");
  }
};

//Blockly.Blocks["on_prepare_data"] = {
//  init: function() {
//    this.appendDummyInput()
//      .appendField("on_prepare_data");
//    this.appendValueInput("MSG1")
//      .appendField("data 1:")
//      .appendField(new Blockly.FieldTextInput("value1"), "DATA1")
//      .appendField("value:");
//    this.setColour(230);
//    this.setTooltip("doing once when program started");
//    this.setHelpUrl("");
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
//  }
//};

// Blockly.Blocks['mqtt_connector_send_command'] = {
// 	init: function () {
// 		this.appendValueInput("TOPIC")
// 			.setCheck("String")
// 			.appendField("on MQTT send Command")
// 			.appendField("Topic:");
// 		this.appendValueInput("MSG")
// 			.appendField("Message:");
// 		this.setInputsInline(true);
// 		this.setPreviousStatement(true, null);
// 		this.setNextStatement(true, null);
// 		this.setColour(65);
// 		this.setTooltip("mqtt_connector_send_command");
// 		this.setHelpUrl("");
// 	}
// };

// Blockly.Blocks['mqtt_connector_receive'] = {
// 	init: function () {
// 		Blockly.BlockSvg.START_HAT = true;
// 		this.appendValueInput("TOPIC")
// 			.setCheck("String")
// 			.appendField("on MQTT recieve")
// 			.appendField("Topic:");
// 		this.appendValueInput("MSG")
// 			.setCheck("String")
// 			.appendField("Message:");
// 		this.appendStatementInput("DO")
// 			.setCheck(null);
// 		this.setInputsInline(true);
// 		this.setPreviousStatement(true, null);
// 		this.setNextStatement(true, null);
// 		this.setColour(65);
// 		this.setTooltip("mqtt_connector_receive");
// 		this.setHelpUrl("");
// 	}
// };
