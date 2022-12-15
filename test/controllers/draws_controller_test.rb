require "test_helper"

class DrawsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @draw = draws(:one)
  end

  test "should get index" do
    get draws_url, as: :json
    assert_response :success
  end

  test "should create draw" do
    test_body = { 
      participants: [
        { email: 'bart@test.com' }, 
        { email: 'lisa@test.com' }, 
        { email: 'maggie@test.com' }
      ], 
      santas: [
        { giver_id: 'bart@test.com', receiver_id: 'lisa@test.com' }, 
        { giver_id: 'lisa@test.com', receiver_id: 'maggie@test.com' }, 
        { giver_id: 'maggie@test.com', receiver_id: 'bart@test.com' }
      ], 
      budget: 50 
    }

    post draws_url, params: test_body, as: :json
    assert_response :created
    
    draw = Draw.last
    assert_equal 50, draw.budget
    assert_equal 'bart@test.com', draw.organizer_id
  end

  test "should show draw" do
    get draw_url(@draw), as: :json
    assert_response :success
  end

  test "should update draw" do
    test_body = { 
      participants: [
        { email: 'bart@test.com' }, 
        { email: 'lisa@test.com' }, 
        { email: 'maggie@test.com' }
      ], 
      santas: [
        { giver_id: 'bart@test.com', receiver_id: 'maggie@test.com' }, 
        { giver_id: 'lisa@test.com', receiver_id: 'bart@test.com' }, 
        { giver_id: 'maggie@test.com', receiver_id: 'lisa@test.com' }
      ], 
      budget: 30 
    }
    patch draw_url(@draw), params: test_body, as: :json
    assert_response :success
    
    draw = Draw.last
    assert_equal 30, draw.budget
    assert_equal 'bart@test.com', draw.organizer_id
  end

  test "should update draw, removing one" do
    test_body = { 
      participants: [
        { email: 'bart@test.com' }, 
        { email: 'lisa@test.com' }, 
        # { email: 'maggie@test.com' }
        { email: 'marge@test.com' }, 
      ], 
      santas: [
        { giver_id: 'bart@test.com', receiver_id: 'maggie@test.com' }, 
        { giver_id: 'lisa@test.com', receiver_id: 'bart@test.com' }, 
        # { giver_id: 'maggie@test.com', receiver_id: 'lisa@test.com' },
        { giver_id: 'marge@test.com', receiver_id: 'marge@test.com' },
      ], 
      budget: 30 
    }
    patch draw_url(@draw), params: test_body, as: :json
    assert_response :success
    
    draw = Draw.last
    assert_equal 30, draw.budget
    assert_equal 'bart@test.com', draw.organizer_id
  end

  test "should destroy draw" do
    assert_difference("Draw.count", -1) do
      delete draw_url(@draw), as: :json
    end

    assert_response :no_content
  end
end
