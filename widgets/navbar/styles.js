const NAV_BAR_HEIGHT = 44;
const STATUS_BAR_HEIGHT = 20;
const NAV_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

module.exports = {
  NAV_BAR_HEIGHT,
  STATUS_BAR_HEIGHT,
  NAV_HEIGHT,
  navBarContainer: {
    backgroundColor: 'white'
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  customTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navBarButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
  },
  navBarButtonText: {
    fontSize: 17,
    letterSpacing: 0.5,
  },
  navBarTitleText: {
    fontSize: 17,
    letterSpacing: 0.5,
    color: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 11,
    textAlign: 'center',
  },

};
