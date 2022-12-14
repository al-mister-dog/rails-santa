require "test_helper"

class GiftsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @participant = participants(:one)
    @gift = gifts(:one)
  end

  test "should get index" do
    get gifts_url, as: :json
    assert_response :success
  end

  test "should create gift" do
    test_body = {
      name: 'Two Turtle Doves',
      price: 2,
      purchased: false,
      participant_id: @participant.id,
    }
    
    post gifts_url, params: test_body, as: :json
    
    assert_response :created
  end

  test "should show gift" do
    get gift_url(@gift), as: :json
    assert_response :success
  end

  test "should update gift" do
    test_body = {
      purchased: true,
      receiver_id: @participant.id,
    }
    patch gift_url(@gift), params: test_body, as: :json
    assert_response :success
  end

  test "should destroy gift" do
    assert_difference("Gift.count", -1) do
      delete gift_url(@gift), as: :json
    end

    assert_response :ok
  end
end
