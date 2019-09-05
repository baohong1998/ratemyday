import { StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  personalContainer: {
    flex: 1
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center"
  },
  homeButton: {
    borderRadius: 70,
    width: 300,
    height: 75,
    margin: 6,
    backgroundColor: "#d95fbe"
  },
  homeLogo: {
    margin: 50,
    fontSize: 50
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 2,

    padding: 10
  },
  commentInput: {
    flex: 1,
    marginRight: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#ededed",

    padding: 5,
    alignSelf: "stretch"
  },
  inputContainer: {
    width: 350,

    marginBottom: 15
  },
  commentInputContainer: {
    marginTop: 20
  },
  inputWrapper: {
    borderBottomWidth: 0
  },
  loginButton: {
    marginTop: 45,

    borderRadius: 70,
    width: 300,
    height: 75,
    backgroundColor: "#d95fbe"
  },
  dateRateContainer: {
    flex: 1.5,
    paddingTop: 30,

    justifyContent: "flex-start",
    alignItems: "stretch"
    // borderBottomColor: 'black',
    // borderBottomWidth: 2
  },
  slideRateContainer: {
    flex: 1,

    justifyContent: "center",

    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  historyButton: {
    borderRadius: 50,
    margin: 10,
    marginTop: 15,

    height: 50,
    backgroundColor: "#d95fbe"
  },
  postButtonContainer: {
    flex: 0.5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  historyButtonContainer: {
    flex: 2,
    marginLeft: 10,
    marginRight: 10
  },

  postButton: {
    borderRadius: 50,
    margin: 10,
    width: 175,
    height: 50,
    backgroundColor: "#d95fbe"
  },
  postedComment: {
    minHeight: 20,
    margin: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 5,
    padding: 10,
    width: "auto",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  commentContainter: {
    flex: 0.5,
    margin: 10,
    alignItems: "center"
  },
  rateContainer: {
    flex: 4,

    alignItems: "center",
    justifyContent: "center"
  },
  dateContainer: {
    flex: 2,

    alignItems: "center",
    justifyContent: "center"
  },
  cursor: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  sliderContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  }
});
