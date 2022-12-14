require "test_helper"

class SantasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @santa = santas(:one)
    @draw = draws(:one)
    @participant_one = participants(:one)
    @participant_two = participants(:two)
  end

  test "should get index" do
    get santas_url, as: :json
    assert_response :success
  end

  test "should create santa" do
    test_body = {
      giver_id: @participant_one.id,
      receiver_id: @participant_two.id,
      draw_id: @draw.id,
    }
    
    post santas_url, params: test_body, as: :json

    assert_response :created
  end

  test "should show santa" do
    get santa_url(@santa), as: :json
    assert_response :success
  end

  test "should update santa" do
    test_body = {
      giver_id: @participant_two.id,
      receiver_id: @participant_one.id,
      draw_id: @draw.id,
    }
    patch santa_url(@santa), params: test_body, as: :json
    assert_response :success
  end

  test "should destroy santa" do
    assert_difference("Santa.count", -1) do
      delete santa_url(@santa), as: :json
    end

    assert_response :no_content
  end
end
